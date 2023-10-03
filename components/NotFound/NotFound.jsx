import React, { useEffect } from 'react'

import Hint from '../Hint'
import Nav from '../Nav'
import commonStyle from '../../styles/Section.module.css'
import i18n from 'i18n-js'
import pageStyles from '../../styles/Page.module.css'

const NotFound = () => {
  const updatePageTitle = () => {
    window.document.title = '404 - ExpenSee'
  }
  useEffect(() => {
    updatePageTitle()
  }, [])

  const onLogoClick = () => {
    window.location.href = window.location.origin
  }

  const navItems = []
  const message = `${i18n.t('userNotFound')}`

  return (
    <div className={pageStyles.Container}>
      <Nav right={navItems} onLogoClick={onLogoClick} />
      <div className={commonStyle.SectionContainer}>
        <Hint closable={false} message={message} />
      </div>
    </div>
  )
}

export default NotFound
