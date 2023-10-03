import React from 'react'
import PropTypes from 'prop-types'

import { getGoogleOAuthURL, getWeiboOAuthURL } from '../../config'

import styles from '../../pages/styles.css'

const Oauth = ({ source }) => {
  // When it's in Chrome/Firefox extension, click on <a>, the page could not
  // open automatically, we have to open it with chrome.tabs.create manually.
  const onWeiboClick = () => {
    try {
      chrome.tabs.create({ url: getWeiboOAuthURL(source) })
    } catch (e) {
      console.warn(e)
    }
  }

  const onGoogleClick = () => {
    try {
      chrome.tabs.create({ url: getGoogleOAuthURL(source) })
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div className={styles.OAuthContainer}>
      <img alt="screenshot" src="/images/nice.png" />
      <div className={styles.Slogan}>Write down your thought and never lost it</div>
      <div className={styles.SignHint}>
        Sign in with
        <a onClick={onWeiboClick} href={getWeiboOAuthURL(source)}>
          Weibo
        </a>
        or
        <a onClick={onGoogleClick} href={getGoogleOAuthURL(source)}>
          Google
        </a>
      </div>
    </div>
  )
}

Oauth.propTypes = {
  source: PropTypes.string,
}

export default Oauth
