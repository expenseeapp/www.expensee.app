import React, { useState, useEffect } from 'react'
import { useUser } from '../../lib/contexts/user'
import { useEditor } from '../../lib/contexts/editor'
import PropTypes from 'prop-types'
import { useQuery, useMutation, gql } from '@apollo/client'
import i18n from 'i18n-js'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Cards from '../Cards'
import InputBox from '../InputBox'
import Tweet from '../Tweet'
import commonStyle from '../../styles/Section.module.css'
import styles from './User.module.css'

const USER_TALKSS = gql`
  query QueryTalkWithUserId($qs: QueryTalkParam!) {
    talks(qs: $qs) {
      text
      id
      user_id
      tags
      likes
      created_at
      updated_at
    }
  }
`

const DELETE_TALK = gql`
  mutation DeleteTalk($id: Int!) {
    deleteTalk(id: $id) {
      success
      message
    }
  }
`

const UPDATE_TALK = gql`
  mutation UpdateTalk($input: UpdateParam!) {
    updateTalk(input: $input) {
      text
      tags
      likes
      created_at
      updated_at
      user_id
      id
    }
  }
`

function UserPage({ author, list }) {
  const { user } = useUser()
  const { editing } = useEditor()

  const { theme } = useTheme()

  const router = useRouter()
  const [page, setPage] = useState(0)
  const { loading, error, data, refetch, fetchMore } = useQuery(USER_TALKSS, {
    variables: {
      qs: {
        // TODO support user name
        user_id: author.id,
        order: 'updated_at.desc',
        page,
      },
    },
  })
  const [deleteTalk, execution] = useMutation(DELETE_TALK)
  const [updateTalk, updateExec] = useMutation(UPDATE_TALK)

  useEffect(() => {
    refetch()
  }, [])

  if (error) {
    console.warn(error)
  }

  if (execution.loading) {
    console.warn('deleting')
  }
  if (updateExec.loading) {
    console.warn(`updating`)
  }

  const onItemDelete = async (item, cb): Promise<void> => {
    const { user_id } = item
    if (!user || user.id != user_id) {
      return
    }

    deleteTalk({
      variables: {
        id: item.id,
      },
      onCompleted: () => {
        if (cb) {
          cb()
        }
        refetch()
      },
      onError: (error) => {
        console.warn(error)
      },
    })
  }

  const onItemLike = async (item, { onSuccess, onFailure }) => {
    const { user_id } = item
    if (!user || user.id != user_id) {
      return
    }
    updateTalk({
      variables: {
        input: {
          id: item.id,
          likes: item.likes + 1,
        },
      },
      onCompleted: () => {
        if (onSuccess) {
          onSuccess()
        }
        refetch()
      },
      onError: (err) => {
        if (onFailure) {
          onFailure()
        }
        console.warn(err)
      },
    })
  }

  const onItemClick = (item) => {
    router.push(`/posts/${item.id}`)
    // window.location.href = `${window.location.origin}/posts/${item.id}`
  }

  const onSubmit = async (err) => {
    // TODO actually currently it's 502, but it's not popup error
    if (err) {
      alert(`status: ${err}`)
    } else {
      await refetch()
    }
  }

  const loadNextPage = async () => {
    if (!loading) {
      await fetchMore({
        variables: {
          qs: {
            user_id: author.id,
            page,
          },
        },
      })
      setPage(page + 1)
    }
  }

  // TODO support pagination
  if (typeof window !== 'undefined') {
    window.onscroll = async () => {
      // TODO remove this offset, the root cause of not triggering load next would be something else
      const offset = 5
      if (window.innerHeight + window.scrollY + offset >= document.body.offsetHeight) {
        loadNextPage()
      }
    }
  }

  return (
    <>
      {editing && (
        <main data-theme={theme}>
          <div className={commonStyle.SectionContainer}>
            {/*  TODO support tags hints*/}
            <InputBox onSubmit={onSubmit} />
          </div>
        </main>
      )}
      <Cards
        data={data ? data.talks : list ? list : []}
        refreshing={false}
        renderPlaceholder={false}
        numberOfColumn={2}
        onRefresh={refetch}
        onEndReached={loadNextPage}
        renderItem={(item, k) => (
          <Tweet
            key={k}
            tweet={item}
            owner={user && user.id === item.user_id}
            onDelete={onItemDelete}
            onLike={onItemLike}
            onClick={onItemClick}
          />
        )}
      />
      {/* TODO tell user there's no more*/}
      {false && <div className={styles.Nomore}>{i18n.t('allLoaded')}</div>}
    </>
  )
}

UserPage.propTypes = {
  list: PropTypes.array,
  author: PropTypes.object,
}

export default UserPage
