import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import styles from './styles.css'
import { format } from '../../utils/date'

const DateCard = ({ value, selected, onClick }) => {
  let cluss = styles.Container
  if (selected) {
    cluss += ` ${styles.ItemSelected}`
  }

  const onClickHandle = () => {
    onClick(value)
  }

  return (
    <div className={cluss}>
      <Button title={format(value, 'MM-DD')} onClick={onClickHandle} />
    </div>
  )
}

DateCard.propTypes = {
  value: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
}

export default DateCard
