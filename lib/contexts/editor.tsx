import { createContext, useState, useContext } from 'react'

const EditorContext = createContext(null)

const Provider = ({ children }) => {
  const [text, setText] = useState('')
  const [editing, setEditing] = useState(false)

  // TODO publich logic here
  // eslint-disable-next-line
  const publish = async () => {}

  // TODO reset logic here
  // eslint-disable-next-line
  const reset = async () => {}

  const exposed = {
    editing,
    setEditing,
    text,
    setText,
    publish,
    reset,
  }

  return <EditorContext.Provider value={exposed}>{children}</EditorContext.Provider>
}

export const useEditor = () => useContext(EditorContext)

export default Provider
