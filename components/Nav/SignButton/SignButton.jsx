import React, { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

const SignButton = () => {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const onClick = () => {
    if (mounted) {
      window.location.href = `${window.location.origin}/sign`
    }
  }

  if (dark) {
    return (
      <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
          fill="rgba(255,255,255,1)"
        />
      </svg>
    )
  }
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z" />
    </svg>
  )
}

export default SignButton
