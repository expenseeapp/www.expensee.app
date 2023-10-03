export const getUserName = (h = window.location.hostname) => {
  const reg = h.includes('gikiapplocalhost') ? /\.?gikiapplocalhost/ : /\.?giki.app/
  return h.replace(reg, '').replace(/\.?fleself.com/, '')
}
