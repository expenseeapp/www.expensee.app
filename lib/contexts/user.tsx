import { createContext, useState, useContext } from 'react'
import * as Q from '../../services/graphql/client'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { COOKIE_KEY_TOKEN } from '../../constants'

const UserContext = createContext(null)

const Provider = ({ children }) => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_KEY_TOKEN])
  const [user, setUser] = useState(null)
  const [signing, setSigning] = useState(false)

  const sign = async (token: string) => {
    setSigning(true)
    try {
      const user = await Q.getUserWithToken(token)
      setCookie(COOKIE_KEY_TOKEN, token)
      setUser(user)
    } catch (e) {
      console.warn(e)
    }
    setSigning(false)
  }

  const login = async () => {
    setSigning(true)
    try {
      const { query } = router
      let token: string = (query && query.token) as string
      if (!query || !query.token) {
        token = cookies[COOKIE_KEY_TOKEN]
      }

      if (token) {
        const user = await Q.getUserWithToken(token)
        setCookie(COOKIE_KEY_TOKEN, token)
        setUser(user)
      }
    } catch (e) {
      console.warn(e)
    }
    setSigning(false)
  }

  const logout = async (redirect?: string) => {
    removeCookie(COOKIE_KEY_TOKEN, { path: '/' })
    setUser(null)
    if (redirect) {
      await router.push(redirect)
    } else {
      await router.push('/')
    }
  }

  const exposed = {
    user,
    login,
    signing,
    sign,
    logout,
  }

  return <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)

export default Provider
