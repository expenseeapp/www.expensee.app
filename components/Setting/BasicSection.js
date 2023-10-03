import React, { useState } from 'react'

import PropTypes from 'prop-types'
import i18n from 'i18n-js'
import Cards from '../Cards'
import EditableInput from '../EditableInput'
import EditableText from '../EditableText'
import commonStyle from '../../styles/Section.module.css'
import styles from './Setting.module.css'

function EditableDomain({ domain, onSave }) {
  return (
    <div className={commonStyle.SectionItem}>
      <div className={styles.CardLabel}>
        <span className={styles.CardLabelText}>{i18n.t('bindingDomain')}</span>
      </div>
      <div className={commonStyle.SectionItemDescription}>
        <div className={commonStyle.SectionItemHint}>{`${i18n.t('CustomDomainInfo')}`}</div>
        <EditableInput value={domain} onChange={() => {}} onSave={onSave} />
      </div>
    </div>
  )
}

EditableDomain.propTypes = {
  domain: PropTypes.string,
  onSave: PropTypes.func,
}

function EditablePersonalURL({ name, onSave }) {
  const [candidate, setCandidate] = useState(name)
  const onChange = (text) => {
    setCandidate(text)
  }
  return (
    <div className={commonStyle.SectionItem}>
      <div className={styles.CardLabel}>
        <span className={styles.CardLabelText}>{i18n.t('personalURL')}</span>
      </div>
      <div className={commonStyle.SectionItemDescription}>
        <div className={commonStyle.SectionItemHint}>
          {`${i18n.t('personalURLDetail')} (https://${candidate}.giki.app)`}
        </div>
        <EditableInput value={name} onChange={onChange} onSave={onSave} />
      </div>
    </div>
  )
}

EditablePersonalURL.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
}

function EditableAvatar({ avatar, onChange, onSave }) {
  return (
    <div className={commonStyle.SectionItem}>
      <div className={styles.CardLabel}>
        <span className={styles.CardLabelText}>{i18n.t('avatar')}</span>
      </div>
      <div className={commonStyle.SectionItemDescription}>
        <div className={commonStyle.SectionItemHint}>{i18n.t('avatarDetail')}</div>
        <EditableInput value={avatar} onChange={onChange} onSave={onSave} />
      </div>
    </div>
  )
}

EditableAvatar.propTypes = {
  avatar: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
}

function EditableBio({ value, onSave }) {
  return (
    <div className={commonStyle.SectionItem}>
      <div className={styles.CardLabel}>
        <span className={styles.CardLabelText}>{i18n.t('bio')}</span>
      </div>
      <div className={commonStyle.SectionItemDescription}>
        <EditableText value={value} onChange={() => {}} onSave={onSave} />
      </div>
    </div>
  )
}

EditableBio.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func,
}

function BasicSection({
  introduction,
  avatar,
  name,
  domain,
  onSaveBio,
  onSaveAvatar,
  onSaveName,
  onSaveDomain,
}) {
  const list = [
    {
      name: 'bio',
    },
    {
      name: 'avatar',
    },
    {
      name: 'name',
    },
    {
      name: 'domain',
    },
  ]
  const renderItem = (item = {}) => {
    switch (item.name) {
      case 'bio': {
        return <EditableBio value={introduction} onSave={onSaveBio} />
      }
      case 'avatar': {
        return <EditableAvatar avatar={avatar} onChange={() => {}} onSave={onSaveAvatar} />
      }
      case 'name': {
        return <EditablePersonalURL name={name} onSave={onSaveName} />
      }
      case 'domain': {
        return <EditableDomain domain={domain} onSave={onSaveDomain} />
      }
      default:
        throw new Error('unsupported')
    }
  }

  return (
    <Cards
      data={list}
      refreshing={false}
      numberOfColumn={1}
      onRefresh={() => {}}
      onEndReached={() => {}}
      renderItem={(item, key) => (
        <div key={key} className={styles.CardContainer}>
          {renderItem(item)}
        </div>
      )}
    />
  )
}

BasicSection.propTypes = {
  introduction: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  domain: PropTypes.string,
  onSaveBio: PropTypes.func,
  onSaveAvatar: PropTypes.func,
  onSaveName: PropTypes.func,
  onSaveDomain: PropTypes.func,
}

export default BasicSection
