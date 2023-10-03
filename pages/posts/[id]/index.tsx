import React, { useEffect } from 'react'
import { buildQuery } from '../../../utils/strings'
import Avatar from '../../../components/Nav/Avatar'
import RSSButton from '../../../components/RSSButton'
import SignButton from '../../../components/Nav/SignButton'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useUser } from '../../../lib/contexts/user'
import { useQuery, gql } from '@apollo/client'
import { useAuthor } from '../../../lib/contexts/author'
import LoadingCircle from '../../../components/Loading/LoadingCircle'
import Body from './Body'

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

const TALK = gql`
  query QueryTalk($id: Int!) {
    talk(id: $id) {
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

export default function Post() {
  const router = useRouter()
  const { query } = useRouter()
  const [likeTalk, likeExecution] = useMutation(LIKE_TALK)

  const { loading, error, data } = useQuery(TALK, {
    variables: {
      id: parseInt(query.id as string, 10),
    },
  })
  const { user, login } = useUser()
  const { author } = useAuthor()

  useEffect(() => {
    login()
  }, [])

  // TODO revisit the loading status to user
  if (loading) {
    return <LoadingCircle />
  }

  if (error) {
    return <div> {`${error}`}</div>
  }

  const onItemLike = async (tweet) => {
    const { id } = tweet
    likeTalk({
      variables: {
        id,
      },
    })
  }

  const onClick = async (tweet) => {
    console.warn('not supported')
  }

  const onAvatarClick = () => {
    router.push('/')
  }

  const navItems = []
  if (!user) {
    navItems.push(<SignButton />)
  }

  const onSubscribe = () => {
    router.push(
      `/api/users/rss?${buildQuery({
        username: author.name,
        type: 'atom',
      })}`,
    )
  }
  navItems.push(<RSSButton onClick={onSubscribe} />)

  const navLeftItems = []
  if (author && author.avatar) {
    navLeftItems.push(<Avatar url={author && author.avatar} onClick={onAvatarClick} />)
  }

  if (likeExecution.loading) {
    console.warn('liking')
  }

  return (
    <Body
      tweet={data.talk}
      owner={user && data.talk && user.id === data.talk.user_id}
      full
      onLike={onItemLike}
      onClick={onClick}
    />
  )
}
