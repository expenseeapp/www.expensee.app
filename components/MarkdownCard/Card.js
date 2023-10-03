import PropTypes from 'prop-types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './Card.module.css'

function Card({ text }) {
  return (
    <div className={styles.Container}>
      <div className={styles.ContentBody}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  )
}

Card.propTypes = {
  text: PropTypes.string,
}

export default Card
