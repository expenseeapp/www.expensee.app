import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import styles from './Logo.module.css'
import { useTheme } from 'next-themes'

function Logo({ onClick, size }) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={styles.Container} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
        <path
          d="M16 16C17.6569 16 19 17.3431 19 19C19 20.6569 17.6569 22 16 22C14.3431 22 13 20.6569 13 19C13 17.3431 14.3431 16 16 16ZM6 12C8.20914 12 10 13.7909 10 16C10 18.2091 8.20914 20 6 20C3.79086 20 2 18.2091 2 16C2 13.7909 3.79086 12 6 12ZM14.5 2C17.5376 2 20 4.46243 20 7.5C20 10.5376 17.5376 13 14.5 13C11.4624 13 9 10.5376 9 7.5C9 4.46243 11.4624 2 14.5 2Z"
          fill="rgba(245,54,54,1)"
        ></path>
      </svg>
    </div>
  )
}

Logo.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  electron: PropTypes.bool,
}

export default Logo
