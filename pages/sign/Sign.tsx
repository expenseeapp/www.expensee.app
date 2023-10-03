import React from 'react'
import { getGitHubOAuthURL, getGoogleOAuthURL, getWeiboOAuthURL } from '../../config'
import styles from './styles.module.css'

import { OAUTH_SCENE_WEB_HOME } from '../../constants'
import Tab from './Tab'
import LoginBox from './LoginBox'

function SignPage() {
  const scene = OAUTH_SCENE_WEB_HOME

  const signinWithGoogle = `${getGoogleOAuthURL(scene)}`
  const signinWithWeibo = `${getWeiboOAuthURL(scene)}`
  const signInWithGitHub = `${getGitHubOAuthURL(scene)}`

  // TODO enable gmail and weibo
  const data = [
    // { type: 'weibo', title: 'Weibo', url: signinWithWeibo },
    { type: 'github', title: 'GitHub', url: signInWithGitHub },
    // { type: 'google', title: 'Google', url: signinWithGoogle },
  ]

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="m-10">
          <div className="relative grid mobile-scaling">
            <div className={styles.Container}>
              <LoginBox initStage={0} />
              <div className={styles.TabContainer}>
                {data.map((item, key) => {
                  const { title, type, url } = item
                  return <Tab key={key} type={type} title={title} url={url} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignPage
