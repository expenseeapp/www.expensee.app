import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toCalendarData } from '../../utils/data'
import Calendar from '../Calendar'
import i18n from 'i18n-js'
import router from 'next/router'
import { getDropboxOAuthURL, getWeiboOAuthURL } from '../../config'
import { OAUTH_SCENE_WEB_BINDING_DROPBOX, OAUTH_SCENE_WEB_BINDING_WEIBO } from '../../constants'

import BasicInfoSection from './BasicSection'
import Cards from '../Cards'
import { useUser } from '../../lib/contexts/user'
import Hint from '../Hint'
import Item from './Item'
import SwitchItem from './SwitchItem'
// TODO migration to graphql
import { api } from '../../api'
import commonStyle from '../../styles/Section.module.css'
import pageStyles from '../../styles/Page.module.css'
import styles from './Setting.module.css'

function ItemCodeBlock({ title, code, description }) {
  return (
    <div className={commonStyle.SectionItem}>
      <div className={styles.CardLabel}>
        <span className={styles.CardLabelText}>{title}</span>
      </div>
      <div className={commonStyle.SectionItemHint}>{description}</div>
      <pre className={styles.CardCode}>{code}</pre>
    </div>
  )
}

ItemCodeBlock.propTypes = {
  title: PropTypes.string,
  code: PropTypes.string,
  description: PropTypes.string,
}

function SettingPage({ viewer }) {
  const { logout } = useUser()
  const [message, setMessage] = useState('')

  const [name, setName] = useState(viewer.name)
  const [avatar, setAvatar] = useState(viewer.avatar)
  const [introduction, setIntroduction] = useState(viewer.introduction)
  const [domain, setDomain] = useState(viewer.domain)
  const [history, setHistory] = useState([])

  const [weiboSyncUpOn, setWeiboSyncUpOn] = useState(!!viewer.enable_weibo_syncup)
  const [dropboxSyncupOn, setDropboxSyncUpOn] = useState(!!viewer.enable_dropbox_syncup)

  useEffect(() => {
    router.prefetch('/posts/[id]')
  }, [])

  // TODO migration to graphql
  const fetchHistory = async () => {
    const res = await api.query('talks', {
      page: -1,
      user_name: name,
      domain,
    })
    if (res.ok) {
      const items = await res.json()
      setHistory(toCalendarData(items.data))
    }
  }
  useEffect(() => {
    fetchHistory()
  })

  const updateNickName = async (text) => {
    if (text === name) {
      return
    }

    if (text === '') {
      setMessage(i18n.t('emptyName'))
      setName(name)
      return
    }

    try {
      const res = await api.save('users', {
        name: text,
      })
      if (res.ok) {
        setMessage(i18n.t('infoSavedOK'))
        setName(text)
        return
      }
      if (res.status === 409) {
        setMessage(i18n.t('nameToken'))
      }
    } catch (e) {
      console.warn(e)
    }
    setName(name)
  }

  const updateBio = async (text) => {
    if (text === introduction) {
      return
    }
    try {
      const res = await api.save('users', {
        introduction: text,
      })
      if (res.ok) {
        setMessage(i18n.t('infoSavedOK'))
        setIntroduction(text)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  const updateAvatar = async (text) => {
    if (text === avatar) {
      return
    }
    if (!text || !text.startsWith('http')) {
      setMessage(i18n.t('invalidAvatarURL'))
      return
    }

    try {
      const res = await api.save('users', {
        avatar: text,
      })
      if (res.ok) {
        setAvatar(text)
        setMessage(i18n.t('infoSavedOK'))
      }
    } catch (e) {
      console.warn(e)
    }
  }

  const updateDomain = async (text) => {
    if (text === domain) {
      return
    }
    try {
      const res = await api.save('users', {
        domain: text,
      })
      if (res.ok) {
        setMessage(i18n.t('infoSavedOK'))
        setDomain(text)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  const onWeiboSyncSwitch = async (enable) => {
    setWeiboSyncUpOn(!!enable)
    if (enable === true) {
      const win = window.open(
        `${getWeiboOAuthURL(OAUTH_SCENE_WEB_BINDING_WEIBO, viewer.id)}`,
        '_blank',
      )
      win.focus()
    }
    const res = await api.save('users', { enable_weibo_syncup: !!enable })
    if (!res.ok) {
      setWeiboSyncUpOn(!enable)
    }
  }

  const onDropboxSyncupSwitch = async (enable) => {
    setDropboxSyncUpOn(!!enable)
    if (enable === true) {
      const url = `${getDropboxOAuthURL({
        scene: OAUTH_SCENE_WEB_BINDING_DROPBOX,
        userId: viewer.id,
      })}`
      const win = window.open(url, '_blank')
      win.focus()
    }
    const res = await api.save('saves', { enable_dropbox_syncup: !!enable })
    if (!res.ok) {
      setDropboxSyncUpOn(!enable)
    }
  }

  const onRemoveAccount = async () => {
    const res = await api.delete('users', {}, {})
    if (res.ok) {
      logout('/sign')
    } else {
      setMessage(i18n.t('AccountRemoveFailed'))
    }
  }

  const onCalendarDateClick = () => {
    // TODO maybe we need fetch the date of items
  }

  const channels = [
    {
      name: 'weibo',
    },
    {
      name: 'dropbox',
    },
  ]
  const renderChannel = (item) => {
    switch (item.name) {
      case 'weibo': {
        return <SwitchItem title="Weibo" checked={weiboSyncUpOn} onClick={onWeiboSyncSwitch} />
      }
      case 'dropbox': {
        return (
          <SwitchItem title="Dropbox" checked={dropboxSyncupOn} onClick={onDropboxSyncupSwitch} />
        )
      }
      default:
        throw new Error('unsupported')
    }
  }

  const securityItems = [
    {
      name: 'token',
    },
    {
      name: 'logout',
    },
    {
      name: 'remove',
    },
  ]

  const renderSecurityItems = (item) => {
    switch (item.name) {
      case 'token': {
        return (
          <ItemCodeBlock
            title={i18n.t('loginTokenTitle')}
            description={i18n.t('loginTokenDescription')}
            code={viewer.token}
          />
        )
      }

      case 'logout': {
        return (
          <Item
            title={i18n.t('signoutTitle')}
            description={i18n.t('signoutDetail')}
            buttonTitle={i18n.t('signout')}
            onClick={() => logout()}
            actionable
          />
        )
      }

      case 'remove': {
        return (
          <Item
            title={i18n.t('RemoveAccount')}
            description={i18n.t('RemoveAccountDescription')}
            buttonTitle={i18n.t('RemoveAccount')}
            onClick={onRemoveAccount}
            actionable
          />
        )
      }

      default:
        throw new Error('unsupport')
    }
  }

  return (
    <div className={pageStyles.Container}>
      {message && <Hint message={message} closable />}

      <div className={commonStyle.SectionContainer}>
        <Calendar values={history} onClick={onCalendarDateClick} />
      </div>

      <BasicInfoSection
        introduction={introduction}
        avatar={avatar}
        name={name}
        domain={domain}
        onSaveBio={updateBio}
        onSaveAvatar={updateAvatar}
        onSaveName={updateNickName}
        onSaveDomain={updateDomain}
      />

      <Cards
        data={channels}
        refreshing={false}
        numberOfColumn={2}
        renderItem={(item, key) => (
          <div key={key} className={styles.CardContainer}>
            {renderChannel(item)}
          </div>
        )}
      />

      <Cards
        data={securityItems}
        refreshing={false}
        numberOfColumn={1}
        renderItem={(item, key) => (
          <div key={key} className={styles.CardContainer}>
            {renderSecurityItems(item)}
          </div>
        )}
      />
    </div>
  )
}

SettingPage.propTypes = {
  viewer: PropTypes.object,
}

export default SettingPage
