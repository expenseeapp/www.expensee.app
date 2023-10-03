import API from '@gikiapp/sdk'

export const api = new API({ env: 'production' })

export const setup = (token) => {
  api.token(token)
}
