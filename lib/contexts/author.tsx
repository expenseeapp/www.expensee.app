import { createContext, useState, useEffect, useContext } from 'react'
import * as Q from '../../services/graphql/client'
import { getUserName } from '../../utils/url'

const AuthorContext = createContext(null)

const Provider = ({ children }) => {
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    getAuthor()
  }, [])

  const getAuthor = async () => {
    const name = getUserName()
    if (name) {
      const author = await Q.getUser(name)
      setAuthor(author)
    }
  }

  const exposed = {
    author,
  }

  return <AuthorContext.Provider value={exposed}>{children}</AuthorContext.Provider>
}

export const useAuthor = () => useContext(AuthorContext)

export default Provider
