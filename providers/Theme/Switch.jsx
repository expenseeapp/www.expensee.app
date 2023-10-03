import React, { useEffect, useState } from 'react'

import styles from './Theme.module.css'
import { useTheme } from 'next-themes'
// TODO move it into a better place
import * as CommentBoxHooks from '../../lib/hooks'

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const hook = CommentBoxHooks.useTheme(theme || 'light')

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    hook.setTheme(newTheme)
  }

  // When mounted on client, now we can show the UI
  useEffect(() => {
    if (['light', 'dark'].indexOf(theme) !== -1) {
      setTheme(theme)
    } else {
      setTheme('light')
    }
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (theme === 'light') {
    return (
      <div
        onClick={() => {
          toggleTheme('dark')
        }}
        className={styles.Container}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
            fill="rgba(0,0,0)"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        toggleTheme('light')
      }}
      className={styles.Container}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"
          fill="rgba(255,255,255,1)"
        />
      </svg>
    </div>
  )
}

export default ThemeChanger
