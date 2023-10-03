import PropTypes from 'prop-types'
import React from 'react'
import { useRouter } from 'next/router'
import Logo from '../Logo'
import ThemeSwitch from '../../providers/Theme/Switch'
import styles from './Nav.module.css'

function Nav({ left = [], right = [], center, onLogoClick }) {
  const router = useRouter()

  const defaultOnLogoClick = () => {
    router.push('/')
  }

  return (
    <div className={styles.Container}>
      <div className={styles.ContainerLeft}>
        <div className={styles.ItemContainer}>
          {left && left.length > 0 ? (
            left.map((c, index) => <div key={index}>{c}</div>)
          ) : (
            <Logo onClick={onLogoClick || defaultOnLogoClick} size="small" />
          )}
        </div>
      </div>
      {center && <div className={styles.ContainerCenter}>{center}</div>}
      <div className={styles.ContainerRight}>
        {right.map((c, index) => (
          <div key={index} className={styles.ItemContainer}>
            {c}
          </div>
        ))}
        <div className={styles.ItemContainer}>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

Nav.propTypes = {
  left: PropTypes.array,
  center: PropTypes.object,
  right: PropTypes.array,
  electron: PropTypes.bool,
  onLogoClick: PropTypes.func,
}

export default Nav
