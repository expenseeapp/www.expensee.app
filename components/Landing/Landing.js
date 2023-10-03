import { APPSTORE } from '../../config'
import { useEffect, useState } from 'react'

import Cards from '../Cards'
import Image from 'next/image'
import Logo from '../Logo'
import React from 'react'
import Tab from '../Tab'
import i18n from 'i18n-js'
import styles from './Landing.module.css'
import { useRouter } from 'next/router'

function HomePage() {
  const router = useRouter()
  const [language, setLanguage] = useState('zh-CN')

  useEffect(() => {
    const language = navigator.language || navigator.userLanguage
    if (language.startsWith('zh-CN')) {
      setLanguage('zh-CN')
    } else if (language.startsWith('zh-TW')) {
      setLanguage('zh-TW')
    } else if (language.startsWith('en')) {
      setLanguage('en')
    } else {
      setLanguage('en')
    }
  }, [])

  const data = [
    {
      type: 'ios',
      title: 'Apple App Store',
      url: APPSTORE,
    },
  ]

  const { lang } = router.query
  if (lang) {
    if (Array.isArray(lang)) {
      i18n.locale = lang[0]
    } else {
      i18n.locale = lang
    }
  }

  return (
    <div>
      <div className={styles.Container}>
        <div className={`${styles.Responsive} ${styles.IntroContainer}`}>
          <div className={styles.IconContainer}>
            <Logo />
            <div className={styles.SloganContainer}>
              <p className={styles.SloganText}>{i18n.t('slogan')}</p>
            </div>
            <div className={styles.FeatureListContainer}>
              <ul>
                <li>{i18n.t('SpeakToTrack')}</li>
                <li>{i18n.t('TextToTrack')}</li>
                <li>{i18n.t('MoodsLight')}</li>
                <li>{i18n.t('SiriYourAssistant')}</li>
                <li>{i18n.t('PhotoToTrack')}</li>
                <li>{i18n.t('APIAutomation')}</li>
              </ul>
            </div>

            <div>
              <Cards
                data={data}
                renderItem={({ title, url, type }, k) => (
                  <Tab key={k} type={type} title={title} url={url} />
                )}
                refreshing={false}
                renderPlaceholder={false}
                numberOfColumn={1}
              />
            </div>
          </div>
          <div className={styles.StoreContainer}></div>
        </div>
        <div className={`${styles.Responsive} ${styles.Iphone}`}>
          <div className={styles.IphoneScreenshot}>
            <Image
              src={
                language === 'zh-CN'
                  ? '/images/zh_home.png'
                  : language === 'zh-TW'
                  ? '/images/tw_home.png'
                  : '/images/en_home.png'
              }
              alt="App screenshot"
              layout="fill"
            />
          </div>
        </div>
      </div>
      <div className={`${styles.Container} ${styles.Footer}`}>
        <div className={styles.Sep} />
        <div className={styles.FooterInfoWrapper}>
          <div className={styles.Contact}>
            <a href="mailto:h.minghe@gmail.com?subject=expensee.app">{i18n.t('contact')}</a>
          </div>
          <div className={styles.Contact}>
            <a href="https://discord.gg/eax4tWHX">Discord</a>
          </div>
          <div className={styles.Contact}>
            <a href="https://twitter.com/_metrue/status/1657214288455692288">Twitter</a>
          </div>
          <div className={styles.Contact}>
            <a href="https://weibo.com/u/2165714507">Weibo</a>
          </div>
          <div className={styles.Contact}>
            <a href="https://expensee.app/document">{i18n.t('document')}</a>
          </div>

          <div className={styles.Contact}>
            <a href="https://gikiapp.github.io/status">{i18n.t('status')}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
