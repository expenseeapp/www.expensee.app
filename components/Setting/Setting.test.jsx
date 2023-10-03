import React from 'react'
import SettingPage from './Setting'
import renderer from 'react-test-renderer'

it.skip('renders correctly', () => {
  const user = {
    name: 'a-name',
    token: 'a-token',
    id: 'a-id',
    avatar: 'a-avatar',
  }
  const tree = renderer.create(<SettingPage user={user} />).toJSON()
  expect(tree).toMatchSnapshot()
})
