import React, { useRef, useState } from 'react'

import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import styles from './EditableText.module.css'
import { useClickAway } from 'react-use'

const EditableText = ({ value, onChange, onSave }) => {
  const ref = useRef(null)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(value)

  useClickAway(ref, () => {
    if (editing) {
      setEditing(false)
      onSave(text)
    }
  })

  const onClick = () => {
    setEditing(true)
  }

  const onTextChange = (e) => {
    setText(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className={styles.Container} ref={ref} onClick={onClick}>
      {editing ? (
        <textarea type="text" onChange={onTextChange} value={text} />
      ) : (
        <div>
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

EditableText.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
}

export default EditableText
