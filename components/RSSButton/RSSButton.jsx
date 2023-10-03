import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const RSSButton = ({ onClick }) => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const dark = theme === 'dark'

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return dark ? (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M3 17a4 4 0 0 1 4 4H3v-4zm0-7c6.075 0 11 4.925 11 11h-2a9 9 0 0 0-9-9v-2zm0-7c9.941 0 18 8.059 18 18h-2c0-8.837-7.163-16-16-16V3z"
        fill="rgba(255,255,255,1)"
      />
    </svg>
  ) : (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M3 17a4 4 0 0 1 4 4H3v-4zm0-7c6.075 0 11 4.925 11 11h-2a9 9 0 0 0-9-9v-2zm0-7c9.941 0 18 8.059 18 18h-2c0-8.837-7.163-16-16-16V3z" />
    </svg>
  )
}

RSSButton.propTypes = {
  onClick: PropTypes.func,
}

export default RSSButton
