import React from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'

import commonStyle from '../../styles/Section.module.css'
import styles from './Setting.module.css'

const SwitchItem = ({ title, description, checked, onClick }) => (
  <div className={commonStyle.SectionItemWithAction}>
    <div className={commonStyle.SectionItemWithActionLeft}>
      <h3 className={commonStyle.SectionItemTitle}>{title}</h3>
      {description ? <div className={commonStyle.SectionItemDescription}>{description}</div> : null}
    </div>
    <div className={styles.SwitchButtonContainer}>
      <Switch width={40} height={20} onChange={onClick} checked={checked} />
    </div>
  </div>
)

SwitchItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
}

export default SwitchItem
