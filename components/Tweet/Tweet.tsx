import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Avatar from '../Nav/Avatar'
import Tag from '../Tag'
import { format } from '../../utils/date'
import styles from './Tweet.module.css'
import DeletionIcon from '../DeletionIcon'
import ReactMarkdown from 'react-markdown'

function Tweet({ tweet, enableAvatar, full, onDelete, onClick, onLike, owner }) {
  const router = useRouter()

  const [showMenu, setShowMenu] = useState(false)
  const [likes, setLikes] = useState(tweet.likes)

  const handleDelete = async (cb) => {
    await onDelete(tweet, cb)
  }

  const handleClick = () => {
    onClick(tweet)
  }

  const handleLike = () => {
    setLikes(likes + 1)
    onLike(tweet, {
      onFailure: () => {
        setLikes(likes - 1)
      },
    })
  }

  const toShowMenu = () => {
    setShowMenu(true)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const handleAvatarClick = () => {
    router.push('/')
  }

  const { tags, text } = tweet

  let finalText = text
  if (!full && text.length > 200) {
    finalText = `${text.substr(0, 144)} ...`
  }

  return (
    <div
      className={styles.Container}
      onClick={toShowMenu}
      onMouseEnter={toShowMenu}
      onMouseLeave={hideMenu}
    >
      <div className={styles.MenuContainer}>
        <div className={styles.DateContainer}>{format(tweet.updated_at, 'MM-DD HH:mm')}</div>
        <div className={styles.ActionButtonDelete}>
          {owner && showMenu && <DeletionIcon onDelete={handleDelete} size="medium" />}
          {enableAvatar && (
            <div className={styles.AvatarContainer}>
              <Avatar url={tweet.avatar} onClick={handleAvatarClick} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.ContentBody} onClick={handleClick}>
        <ReactMarkdown>{finalText}</ReactMarkdown>
      </div>
      <div className={styles.ItemFooter}>
        <div className={styles.TagsContainer}>
          {(tags || []).slice(0, 2).map((c, index) => (
            <Tag value={c} key={index} />
          ))}
        </div>
        <div className={styles.LikesContainer} onClick={handleLike}>
          <div className={styles.LikeCount}>{likes > 0 ? likes : null}</div>
          {likes > 0 ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
              <path fill="none" d="M0 0H24V24H0z" />
              <path
                d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                fill="rgba(225,149,149,1)"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
              <path fill="none" d="M0 0H24V24H0z" />
              <path
                d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                fill="rgba(211,211,211,1)"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

Tweet.propTypes = {
  tweet: PropTypes.object,
  enableAvatar: PropTypes.bool,
  full: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onLike: PropTypes.func,
  owner: PropTypes.bool,
}

export default Tweet
