import React from 'react'
import DocumentPage from './Document'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<DocumentPage />).toJSON()
  expect(tree).toMatchSnapshot()
})
