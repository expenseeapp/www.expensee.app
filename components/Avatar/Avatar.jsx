import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.css'

const Avatar = ({ value, onClick }) => (
  <div className={styles.AvatarContainer} onClick={onClick}>
    <img alt="avatar" src={value || '/images/avatar.svg'} />
  </div>
)

Avatar.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
}

export default Avatar
