import React from 'react'
import styles from './ProductHunt.module.css'

function ProductHunt() {
  // TODO publish to producthub and replace bellow giki.app
  return (
    <a
      href="https://www.producthunt.com/posts/giki-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-giki-2"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=272045&theme=dark"
        alt="Giki - Blogging, note-taking, ideas management, thoughts catching. | Product Hunt"
        className={styles.ProductHunt}
      />
    </a>
  )
}

export default ProductHunt
