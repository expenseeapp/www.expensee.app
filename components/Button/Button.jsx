import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import styles from './Button.module.css'
import { useTheme } from 'next-themes'

const Button = ({ title, onClick }) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <button onClick={onClick} className={theme === 'dark' ? styles.DarkLogout : styles.Logout}>
      {title}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
