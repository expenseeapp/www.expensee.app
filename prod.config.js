import { buildQuery } from './utils/strings'

export const APP_BASE_URL = 'https://giki.app'
export const OAUTH_CALLBACK = 'https://giki.app/api/users/oauth'
export const WEB_PUSH_PUBLIC_VAPID_KEY =
  'BNM9-inDMfWpoXLOtGcI4NRws2hWwNf-b5VZNzFhkK3AOMx52LWzzsIHR6xrmGaoXKHTFulqkBab29YfCVz60MA'

export const WEIBO = {
  CLIENT_ID: '2893677553',
  CLIENT_SECRET: '04347dc5220904dab13a87609ba36ddb',
}

export const GOOGLE = {
  CLIENT_ID: '98637681909-rvrrnudv4jn82c17mp00tan5kob7e66m.apps.googleusercontent.com',
  CLIENT_SECRET: 'q0847gOhbTaZU2ZJSWeMJ0SW',
}

export const GITHUB = {
  CLIENT_ID: '6a36d7ba09b9283c67d1',
}

export const DROPBOX = {
  CLIENT_ID: 'xtx1xja8577d6lc',
  CLIENT_SECRET: 'snloakabtnyzteu',
}

export const getGoogleOAuthURL = (scene, userId) => {
  const data = {
    scene,
    userId,
    provider: 'google',
  }
  const qs = {
    client_id: GOOGLE.CLIENT_ID,
    redirect_uri: OAUTH_CALLBACK,
    scope: 'email profile',
    response_type: 'code',
    approval_prompt: 'force',
    state: JSON.stringify(data),
  }
  return `https://accounts.google.com/o/oauth2/auth?${buildQuery(qs)}`
}

export const getWeiboOAuthURL = (scene, userId) => {
  const data = {
    scene,
    userId,
    provider: 'weibo',
  }
  const qs = {
    client_id: WEIBO.CLIENT_ID,
    redirect_uri: OAUTH_CALLBACK,
    state: JSON.stringify(data),
  }
  return `https://api.weibo.com/oauth2/authorize?${buildQuery(qs)}`
}

export const getGitHubOAuthURL = (scene, userId) => {
  const data = {
    scene,
    userId,
    provider: 'github',
  }
  const qs = {
    client_id: GITHUB.CLIENT_ID,
    redirect_uri: 'https://api.minghe.me/oauth/github',
    state: JSON.stringify(data),
  }
  return `https://github.com/login/oauth/authorize?${buildQuery(qs)}`
}

export const getDropboxOAuthURL = ({ scene, userId }) => {
  const data = {
    scene,
    userId,
    provider: 'dropbox',
  }

  const qs = {
    client_id: DROPBOX.CLIENT_ID,
    response_type: 'code',
    redirect_uri: OAUTH_CALLBACK,
    state: JSON.stringify(data),
  }
  return `https://www.dropbox.com/oauth2/authorize/?${buildQuery(qs)}`
}

export const APPSTORE = 'https://apps.apple.com/cn/app/%E5%8F%BD%E5%96%B3/id1519478312'
export const TEST_FLIGHT = 'https://testflight.apple.com/join/FJ7wTrf6'
export const GRAPHQL_API = 'https://api.minghe.me/graphql'
