import Cookies from 'universal-cookie'

export function extractURL(text) {
  const httpsFlag = 'https://'
  const httpFlag = 'http://'

  const urls = []

  let currentStr = ''
  let started = false
  let url = ''
  for (const c of text) {
    if (c === ' ') {
      if (started) {
        urls.push(url)
      }

      url = ''
      started = false
      currentStr = ''
    }

    if (started) {
      url += c
    } else {
      const tryStr = currentStr + c
      if (httpFlag.startsWith(tryStr) || httpsFlag.startsWith(tryStr)) {
        currentStr = tryStr
      } else {
        currentStr = c
      }
    }

    const meet = currentStr === httpsFlag || currentStr === httpFlag
    if (meet && !started) {
      started = true
      url = currentStr
    }
  }

  if (started) {
    urls.push(url)
  }

  return urls
}

export const buildQuery = (qs = {}) =>
  Object.keys(qs)
    .filter((k) => !!qs[k])
    .map((k) => {
      const key = encodeURIComponent(k)
      const value = encodeURIComponent(qs[k])
      return `${key}=${value}`
    })
    .join('&')

export const getCookie = (key) => {
  const cookie = new Cookies()
  return cookie.get(key)
}

export function maybeEmailAddress(email) {
  const re =
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function validateComment(text) {
  // TODO sanitize check, -- too weak now
  return text && text.length > 0
}

export function appendUniqueName(comment) {
  const [name] = comment.email.split('@')
  return Object.assign(comment, { name })
}
