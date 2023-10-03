import PropTypes from 'prop-types'
import React from 'react'
import button from './Button.module.css'
import commonStyle from '../../styles/Section.module.css'
import styles from './Setting.module.css'

function Item({ title, description, actionable, buttonTitle, onClick }) {
  return (
    <div className={commonStyle.SectionItemWithAction}>
      <div className={commonStyle.SectionItemWithActionLeft}>
        <div className={styles.CardLabel}>
          <span className={styles.CardLabelText}>{title}</span>
        </div>
        <div className={commonStyle.SectionItemHint}>{description}</div>
      </div>
      {actionable && (
        <div>
          <button className={button.Logout} onClick={onClick}>
            {buttonTitle}
          </button>
        </div>
      )}
    </div>
  )
}

Item.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonTitle: PropTypes.string,
  onClick: PropTypes.func,
  actionable: PropTypes.bool,
}

export default Item
