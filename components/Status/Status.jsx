import React from 'react'

import Nav from '../Nav'
import Hint from '../Hint'

import pageStyles from '../../styles/Page.module.css'
import commonStyle from '../../styles/Section.module.css'

const StatusPage = () => {
  const query = new URLSearchParams(window.location.search)
  const message = query.get('message')

  const onLogoClick = () => {
    window.location.href = window.location.origin
  }

  return (
    <div className={pageStyles.Container}>
      <Nav right={[]} onLogoClick={onLogoClick} />
      <div className={commonStyle.SectionContainer}>
        <Hint closable={false} message={message} />
      </div>
    </div>
  )
}

export default StatusPage
