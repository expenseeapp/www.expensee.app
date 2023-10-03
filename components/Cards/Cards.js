import PropTypes from 'prop-types'
import React from 'react'
import styles from './Cards.module.css'

function Cards(props) {
  const { data, renderItem, onEndReached, numberOfColumn } = props

  const columns = []
  // TODO different placeholder style should be
  for (let i = 0; i < numberOfColumn; i += 1) {
    columns[i] = []
  }

  data.forEach((item, i) => {
    const col = i % numberOfColumn
    if (columns[col] === undefined) {
      columns[col] = []
    }
    columns[col].push(item)
  })

  // eslint-disable-next-line
  const onScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
    // TODO adjust it if not accurate
    const paddingToBottom = 20
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      onEndReached()
    }
  }

  const dynamicWidth = {
    width: `${(1 / numberOfColumn) * 100}%`,
  }
  return (
    <div className={styles.Container}>
      {columns.map((group, k) => (
        <div key={k} className={styles.ColumnContainer} style={dynamicWidth}>
          {group.map((item, index) => renderItem(item, index))}
        </div>
      ))}
    </div>
  )
}

Cards.propTypes = {
  data: PropTypes.array,
  numberOfColumn: PropTypes.number,
  renderItem: PropTypes.func,
  refreshing: PropTypes.bool,
  onEndReached: PropTypes.func,
  onRefresh: PropTypes.func,
  renderPlaceholder: PropTypes.bool,
}

export default Cards
