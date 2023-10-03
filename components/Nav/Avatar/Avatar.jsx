import PropTypes from 'prop-types'
import React from 'react'
import styles from '../Nav.module.css'

const Avatar = ({ url, onClick }) => {
  const preloaderImage = 'https://via.placeholder.com/100x100/000000/FFFFFF/?text=Giki'
  return (
    <div
      className={styles.AvatarContainer}
      style={{
        backgroundImage: `url(${url}),url(${preloaderImage})`,
      }}
      onClick={onClick}
    />
  )
}

Avatar.propTypes = {
  onClick: PropTypes.func,
  url: PropTypes.string,
}

export default Avatar
