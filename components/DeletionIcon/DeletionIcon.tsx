import { useState } from 'react'

import LoadingCircle from '../Loading/LoadingCircle'

interface IconOptions {
  size?: string
  onDelete: (cb) => Promise<void>
}

const DeletionIcon = (options: IconOptions) => {
  const [loading, setLoading] = useState(false)

  const { size, onDelete } = options

  const handleClick = async () => {
    setLoading(true)
    await onDelete(() => {
      setLoading(false)
    })
  }

  if (loading) {
    return <LoadingCircle color="red" />
  }

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size === 'medium' ? '16' : '18'}
      height={size === 'medium' ? '16' : '18'}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
        fill="rgba(231,76,60,1)"
      />
    </svg>
  )
}

export default DeletionIcon
