import { NextApiRequest, NextApiResponse } from 'next'

import { customAlphabet } from 'nanoid/async'
import { kv } from '@vercel/kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body
    let authKey = req.body.auth_key as string

    try {
      const nanoid = customAlphabet('1234567890abcdef', 10)
      let previousDeviceToken = ''
      if (authKey.length > 0) {
        previousDeviceToken = (await kv.get(authKey)) as string
      }
      if (previousDeviceToken.length > 0) {
        await kv.set(authKey, token)
      } else {
        authKey = await nanoid() //=> "4f90d13a42"
        await kv.set(authKey, token)
      }

      res.status(200).json({
        success: true,
        auth_key: authKey,
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        error: `${e}`,
      })
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Method not allowed, please use POST',
    })
  }
}
