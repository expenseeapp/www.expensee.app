import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'

import styles from './styles.css'

export const NavAvatar = ({ user, onAvatarClick, onSignClick }) => (
  <div className={styles.AvatarContainer}>
    {user ? (
      <img onClick={onAvatarClick} src={user.avatar} alt="avatar" />
    ) : (
      <p onClick={onSignClick}>Sign in</p>
    )}
  </div>
)

NavAvatar.propTypes = {
  user: PropTypes.object,
  onAvatarClick: PropTypes.func,
  onSignClick: PropTypes.func,
}

const HomeHeader = ({ onLogoClick, onAvatarClick, onSignClick, user }) => (
  <div className={styles.Container}>
    <div className={styles.LogoContainer}>
      <Logo onClick={onLogoClick} />
    </div>
    <div className={styles.AvatarContainer}>
      {user ? (
        <img onClick={onAvatarClick} src={user.avatar} alt="avatar" />
      ) : (
        <p onClick={onSignClick}>Sign in</p>
      )}
    </div>
  </div>
)

HomeHeader.propTypes = {
  onLogoClick: PropTypes.func,
  onAvatarClick: PropTypes.func,
  onSignClick: PropTypes.func,
  user: PropTypes.object,
}

export default HomeHeader
