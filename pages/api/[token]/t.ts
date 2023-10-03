import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import apn, { NotificationAlertOptions } from 'apn';

const PUSH_NOTIFICATION_P8 = process.env.PUSH_NOTIFICATION_P8;
const PUSH_NOTIFICATION_KEY_ID = process.env.PUSH_NOTIFICATION_KEY_ID;
const PUSH_NOTIFICATION_TEAM_ID = process.env.PUSH_NOTIFICATION_TEAM_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token, debug } = req.query;
    const contentAvailable = (req.query.contentAvailable as string) || '';
    const title = (req.query.title as string) || 'ExpenSee';
    const source = (req.query.source as string) || 'No source specified for this expense';
    const text = (req.query.text as string) || '';

    if (!token) {
      res.status(400).json({
        success: false,
        message: 'there is no authorization token found in the url',
      });
      return;
    }

    if (!text) {
      res.status(400).json({
        success: false,
        message: 'text is empty',
      });
      return;
    }

    const options = {
      token: {
        key: PUSH_NOTIFICATION_P8,
        keyId: PUSH_NOTIFICATION_KEY_ID,
        teamId: PUSH_NOTIFICATION_TEAM_ID,
      },
      production: debug ? false : true,
    };

    const apnProvider = new apn.Provider(options);

    const deviceToken: string = await kv.get(token as string);
    const note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600 * 24; // Expires 1*24 hour from now.
    // note.badge = 1
    note.sound = 'ping.aiff';
    note.alert = {
      title: title,
      subtitle: source,
      body: text,
    } as NotificationAlertOptions;
    note.payload = {
      route: 'expense',
    };
    // Send a silent push notification
    // When ExpenSee receives a silent push notification (the content-available flag set to 1),
    // it wakes up or launches in the background and calls the application(_:didReceiveRemoteNotification:fetchCompletionHandler:) method in app delegate.
    // Then ExpenSee will performce the ExpenSee tracking
    note.contentAvailable = contentAvailable != 'false';
    note.topic = 'app.expensee';

    apnProvider
      .send(note, deviceToken)
      .then((responses) => {
        if (responses.failed.length > 0) {
          res.status(500).json({
            success: false,
            error: responses.failed
              .map((f) => {
                return `${f.error}`;
              })
              .join(`-`),
          });
          return;
        }
        res.status(200).send({
          success: true,
          devices: responses.sent.map((f) => f.device),
        });
      })
      .catch((e) => {
        res.status(500).json({
          success: false,
          error: `${e}`,
        });
      })
      .finally(() => {
        apnProvider.shutdown();
      });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: `${e}`,
    });
  }
}
