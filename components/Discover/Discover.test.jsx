import DiscoverPage from './Discover'
import React from 'react'
import renderer from 'react-test-renderer'

// TODO enable this
it.skip('renders correctly', () => {
  const user = {
    name: 'a-name',
    token: 'a-token',
    id: 'a-id',
    avatar: 'a-avatar',
  }
  const data = [
    { text: 'text-1', tags: [] },
    { text: 'text-2', tags: [] },
  ]
  const tree = renderer.create(<DiscoverPage user={user} data={data} />).toJSON()
  expect(tree).toMatchSnapshot()
})
