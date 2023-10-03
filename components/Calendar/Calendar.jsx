import React, { useEffect, useState } from 'react'
import { format, shiftDate } from '../../utils/date'

import CalendarHeatmap from 'react-calendar-heatmap'
import PropTypes from 'prop-types'
import { useTheme } from 'next-themes'

const Calendar = ({ values, onClick }) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const dark = theme === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const onClickHandle = (value) => {
    if (value) {
      onClick(format(value.date, 'YYYY-MM-DD'))
    } else {
      onClick(value)
    }
  }
  const classForValue = (value) => {
    if (!value) {
      return dark ? 'color-empty-dark' : 'color-empty'
    }
    let cluss = 'color-github-empty'
    if (value && value.count <= 4) {
      cluss = `color-github-${value.count}`
    } else {
      cluss = 'color-github-4'
    }
    return dark ? `${cluss}-dark` : cluss
  }

  const tooltipDataAttrs = (value) => {
    if (value && value.date && value.count) {
      return {
        'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
      }
    }
    return {
      'data-tip': 'no data',
    }
  }

  const endDate = new Date()
  const startDate = shiftDate(endDate, -360)
  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      values={values}
      classForValue={classForValue}
      tooltipDataAttrs={tooltipDataAttrs}
      showWeekdayLabels
      onClick={onClickHandle}
    />
  )
}

Calendar.propTypes = {
  values: PropTypes.array,
  onClick: PropTypes.func,
}

export default Calendar
