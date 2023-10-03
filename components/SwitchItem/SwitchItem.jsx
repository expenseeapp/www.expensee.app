import React from 'react'
import PropTypes from 'prop-types'

import commonStyle from '../../styles/Section.module.css'
import button from './Button.module.css'

const SwitchItem = ({ title, buttonTitle, onClick }) => (
  <div className={commonStyle.SectionItemWithAction}>
    <div className={commonStyle.SectionItemWithActionLeft}>
      <h3 className={commonStyle.SectionItemTitle}>{title}</h3>
    </div>
    <div>
      <button className={button.Logout} onClick={onClick}>
        {buttonTitle}
      </button>
    </div>
  </div>
)

SwitchItem.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  onClick: PropTypes.func,
}

export default SwitchItem
