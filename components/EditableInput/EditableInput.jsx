import React, { useRef, useState } from 'react'

import PropTypes from 'prop-types'
import styles from './EditableInput.module.css'
import { useClickAway } from 'react-use'

const EditableInput = ({ value, onChange, onSave }) => {
  const ref = useRef(null)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(value)

  const onTextChange = (e) => {
    setText(e.target.value)
    onChange(e.target.value)
  }

  useClickAway(ref, () => {
    if (editing) {
      setEditing(false)
      onSave(text)
    }
  })

  const onClick = () => {
    setEditing(true)
  }

  return (
    <div ref={ref} className={styles.Container} onClick={onClick}>
      {editing ? <input type="text" onChange={onTextChange} value={text} /> : <div>{value}</div>}
    </div>
  )
}

EditableInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
}

export default EditableInput
