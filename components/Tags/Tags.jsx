import React from 'react'
import PropTypes from 'prop-types'

import Tag from '../Tag'
import styles from './Tags.module.css'

const Tags = ({ values, dark, selected, closable, onClick, onClose }) => (
  <div className={styles.Container}>
    {values.map((t, index) => (
      <Tag
        closable={closable}
        dark={dark}
        value={t}
        key={index}
        onClick={onClick}
        onClose={onClose}
        selected={t === selected}
      />
    ))}
  </div>
)

Tags.propTypes = {
  values: PropTypes.array,
  selected: PropTypes.bool,
  dark: PropTypes.bool,
  closable: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
}

export default Tags
