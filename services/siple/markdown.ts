export async function renderMarkdown(text: string, context?: string) {
  const MARKDOWN_API_URL = 'https://api.minghe.me/github/markdown'
  return fetch(MARKDOWN_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'gfm', text, ...(context ? { context } : {}) }),
  }).then((r) => r.text())
}
