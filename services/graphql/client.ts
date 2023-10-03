import { GRAPHQL_API } from '../../config'
import { gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'

// TODO should persist the token to user for email and github provider
const USER = gql`
  query ($qs: QueryUserParam!) {
    users(qs: $qs) {
      token
      name
      id
      email
      avatar
      introduction
    }
  }
`

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        talks: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

export const getClient = (token) => {
  if (token) {
    return new ApolloClient({
      uri: GRAPHQL_API,
      cache,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } else {
    return new ApolloClient({
      uri: GRAPHQL_API,
      cache,
    })
  }
}

export const getUser = async (name: string, token?: string) => {
  const client = getClient(token)
  const data = await client.query({
    query: USER,
    variables: {
      qs: {
        name,
      },
    },
  })
  const { users } = data.data

  if (users.length === 0) {
    return null
  }

  if (users.length > 1) {
    throw new Error(`query user with name ${name} should only one user return`)
  }

  return users[0]
}

export const getUserWithToken = async (token: string) => {
  const client = getClient(token)
  const data = await client.query({
    query: USER,
    variables: {
      qs: {
        token,
      },
    },
  })
  const { users } = data.data

  if (users.length === 0) {
    return null
  }

  if (users.length > 1) {
    throw new Error(`query user with token should only one user return`)
  }

  return { ...users[0], token }
}
