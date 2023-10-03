import * as Q from '../../services/graphql/client'
import Cookies from 'universal-cookie'
import { getUserName } from '../../utils/url'
import { COOKIE_KEY_TOKEN } from '../../constants'

export const getAuthor = async (ctx) => {
  const { req } = ctx
  const domain = req && req.headers && req.headers.host.split(':')[0]
  let name = ''
  if (
    domain &&
    (domain.includes('.giki.app') ||
      domain.includes('.gikiapplocalhost') ||
      domain.includes('.fleself.com'))
  ) {
    name = getUserName(domain)
  }
  if (name) {
    const author = await Q.getUser(name)
    return author
  }
  return null
}

export const getViewer = async (ctx) => {
  const { req, query } = ctx
  let token = query && query.token
  if (token) {
    const viewer = await Q.getUserWithToken(token)
    return viewer
  }

  const cookie = req && req.headers && req.headers.cookie
  token = new Cookies(cookie).get(COOKIE_KEY_TOKEN)
  if (token) {
    const viewer = await Q.getUserWithToken(token)
    return viewer
  }
  return null
}
