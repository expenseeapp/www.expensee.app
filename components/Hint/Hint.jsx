import React, { useState } from 'react'

import styles from './Hint.module.css'
import { useTheme } from 'next-themes'
import ReactMarkdown from 'react-markdown'

const Hint = (props) => {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const { message, closable } = props
  const [show, setShow] = useState(true)
  const onHide = () => {
    setShow(false)
  }
  return (
    show && (
      <div className={styles.Container}>
        <div className={styles.MessageContainer}>
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
        {closable !== false && (
          <div className={styles.IconContainer}>
            {dark ? (
              <svg
                onClick={onHide}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            ) : (
              <svg
                onClick={onHide}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            )}
          </div>
        )}
      </div>
    )
  )
}

export default Hint
