import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n-js'
import styles from './styles.css'
import { useTheme } from 'next-themes'

const Slogan = ({ onClick, electron }) => {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  let lightLogo = '/images/logo.png'
  let darkLogo = '/images/logo-dark.png'
  if (electron) {
    darkLogo = './images/logo-dark.png'
    lightLogo = './images/logo.png'
  }

  return (
    <div className={styles.Container}>
      <div className={styles.LogoContainer}>
        <img onClick={onClick} src={dark ? darkLogo : lightLogo} alt="giki-logo" />
      </div>
      <div className={styles.SloganContainer}>
        <h2>{i18n.t('slogan')}</h2>
      </div>
    </div>
  )
}

Slogan.propTypes = {
  onClick: PropTypes.func,
  electron: PropTypes.bool,
}

export default Slogan
