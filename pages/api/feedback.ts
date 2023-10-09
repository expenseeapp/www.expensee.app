import { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_API_ENDPOINT = 'https://api.github.com';
const OWNER = 'metrue'; // GitHub username or organization name
const REPO = 'ExpenSee'; // Repository name
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text } = req.query;

    const r = await fetch(`${GITHUB_API_ENDPOINT}/repos/${OWNER}/${REPO}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        title: text,
        body: text,
      }),
    });
    res.status(r.status).json({
      message: 'create issue on GitHub',
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: `${e}`,
    });
  }
}
