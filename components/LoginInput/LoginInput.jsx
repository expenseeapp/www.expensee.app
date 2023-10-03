import React, { useState } from 'react'

import { APP_BASE_URL } from '../../config'
import PropTypes from 'prop-types'
import i18n from 'i18n-js'
import styles from './styles.css'

const LoginInput = ({ onLogin }) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const gotoSetting = () => {
    const url = `${APP_BASE_URL}/setting`
    try {
      // electron renderrer /public/desktop.html
      // eslint-disable-next-line
      openURL(url)
    } catch (e) {
      console.warn(e)
    }

    try {
      chrome.tabs.create({ url })
    } catch (e) {
      console.warn(e)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (value === '') {
        gotoSetting()
      } else {
        onLogin(value)
      }
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.ContainerBox}>
        <div className={styles.InputContainer}>
          <input
            type="password"
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={i18n.t('loginInputPlaceholder')}
          />
        </div>
      </div>
    </div>
  )
}

LoginInput.propTypes = {
  onLogin: PropTypes.func,
}

export default LoginInput
