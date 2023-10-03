import PropTypes from 'prop-types'
import React from 'react'
import { useTheme } from 'next-themes'
import styles from './Tag.module.css'
import Button from '../Button'

const Tag = ({ value, closable, selected, onClick, onClose }) => {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  let cluss = styles.Container
  if (selected) {
    cluss += ` ${styles.ItemSelected}`
  }

  const onClickHandle = () => {
    if (onClick) {
      onClick(value)
    }
  }
  const onCloseClick = () => {
    if (onClose) {
      onClose(value)
    }
  }

  if (value === '') {
    return null
  }

  return (
    <div className={cluss}>
      <Button title={value.substr(0, 8)} onClick={onClickHandle} />
      {closable && (
        <div className={styles.CloseIcon}>
          {dark ? (
            <svg
              onClick={onCloseClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          ) : (
            <svg
              onClick={onCloseClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>
          )}
        </div>
      )}
    </div>
  )
}

Tag.propTypes = {
  value: PropTypes.string,
  selected: PropTypes.bool,
  closable: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
}

export default Tag
