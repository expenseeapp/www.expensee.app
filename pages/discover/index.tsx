import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Tweet from '../../components/Tweet'
import Cards from '../../components/Cards'
import { useMutation, useQuery, gql } from '@apollo/client'

const LIKE_TALK = gql`
  mutation LikeTalk($id: Int!) {
    likeTalk(id: $id) {
      id
      user_id
      text
      tags
      likes
      created_at
      updated_at
    }
  }
`

const TALKS = gql`
  query QueryTalk($qs: QueryTalkParam!) {
    talks(qs: $qs) {
      user_id
      text
      tags
      likes
      created_at
      updated_at
      private
      id
    }
  }
`

export default function Discover() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const { loading, error, data, refetch, fetchMore } = useQuery(TALKS, {
    variables: {
      qs: {
        order: 'updated_at.desc',
        page,
      },
    },
  })
  const [likeTalk, likeExecution] = useMutation(LIKE_TALK)

  const onItemLike = async (item) => {
    if (!likeExecution.loading) {
      const { id } = item
      likeTalk({
        variables: {
          id,
        },
      })
    }
  }

  const onItemClick = (tweet) => {
    const { id } = tweet
    router.push(`/posts/${id}`)
  }

  const onDelete = () => {
    console.warn('not supported')
  }

  const loadNextPage = async () => {
    if (!loading) {
      await fetchMore({
        variables: {
          qs: {
            page,
          },
        },
      })
      setPage(page + 1)
    }
  }

  if (typeof window !== 'undefined') {
    window.onscroll = async () => {
      // TODO remove this offset, the root cause of not triggering load next would be something else
      const offset = 5
      if (window.innerHeight + window.scrollY + offset >= document.body.offsetHeight) {
        loadNextPage()
      }
    }
  }

  if (error) {
    console.warn(error)
  }

  if (loading) {
    console.warn('loading')
  }

  return (
    <Cards
      data={data ? data.talks : []}
      refreshing={loading}
      renderPlaceholder={false}
      numberOfColumn={2}
      onRefresh={refetch}
      onEndReached={loadNextPage}
      renderItem={(item, key) => (
        <Tweet
          key={key}
          enableAvatar
          tweet={item}
          onDelete={onDelete}
          onLike={onItemLike}
          onClick={onItemClick}
        />
      )}
    />
  )
}
