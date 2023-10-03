import React from 'react'
import i18n from 'i18n-js'
import renderer from 'react-test-renderer'
import eni18n from '../../i18n/i18n.en.json'
import LandingPage from './Landing'
import zhi18n from '../../i18n/i18n.zh.json'

it('renders correctly', () => {
  i18n.translations = {
    en: eni18n,
    zh: zhi18n,
    'zh-Hant': zhi18n,
  }
  i18n.locale = 'en'
  i18n.fallbacks = true
  const tree = renderer.create(<LandingPage />).toJSON()
  expect(tree).toMatchSnapshot()
})
