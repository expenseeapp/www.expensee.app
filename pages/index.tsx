import Header from '../components/Head'
import Landing from '../components/Landing'
import PropTypes from 'prop-types'
import i18n from 'i18n-js'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

export default function Home() {
  const router = useRouter()

  const { lang } = router.query
  if (lang) {
    if (Array.isArray(lang)) {
      i18n.locale = lang[0]
    } else {
      i18n.locale = lang
    }
  }
  useEffect(() => {
    if (!lang) {
      const LANG = window.navigator['userLanguage'] || window.navigator.language
      const locale = ['zh-TW', 'zh-CN', 'zh-HK', 'zh-SG'].indexOf(LANG) !== -1 ? 'zh' : 'en'
      i18n.locale = locale
    }
  }, [])

  return (
    <>
      <Header
        keywords={i18n.t('SiteKeyWords')}
        description={i18n.t('SiteDescription')}
        summary={i18n.t('SiteDescription')}
        url="https://expensee.app"
        subject={i18n.t('SiteSubject')}
        title="ExpenSee"
      />
      <DefaultSeo {...SEO} />
      <Landing />
    </>
  )
}

Home.propTypes = {
  home: PropTypes.bool,
}
