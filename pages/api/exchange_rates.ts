import { NextApiRequest, NextApiResponse } from 'next';

import { kv } from '@vercel/kv';

const EXCHANGERATE_API_KEY = process.env.EXCHANGERATE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currency } = req.query;

    const KEYS = {
      timestamp: `exchange_rates_${currency}_timestamp`,
      result: `exchange_rates_${currency}_result`,
    };
    const timestamp = await kv.get(KEYS.timestamp);
    const now = new Date();
    const expireAfter = 24 * 60 * 60 * 1000 * 2; // 2 day
    if (now.getTime() - new Date(timestamp as string).getTime() < expireAfter) {
      const cached = await kv.get(KEYS.result);
      res.status(200).json(cached as string);
      return;
    }

    const r = await fetch(`https://v6.exchangerate-api.com/v6/latest/${currency}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${EXCHANGERATE_API_KEY}`,
      },
    });
    if (r.ok) {
      const json = await r.json();
      await kv.set(KEYS.timestamp, new Date().toISOString());
      await kv.set(KEYS.result, json);
      res.status(200).json(json);
      return;
    }

    res.status(r.status).json({
      error: `failed to request exchange rate from exchangerate-api.com: ${r.statusText}`,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: `${e}`,
    });
  }
}
