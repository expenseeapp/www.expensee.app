import i18n from 'i18n-js'
import AboutPage from './AboutGiki'
import Header from '../../components/Head'

function About() {
  return (
    <>
      <Header
        keywords="blog, diary, tweets, tag"
        description="giki.app, a universal platform for your blog, diary, and tweets"
        summary="giki.app, a universal platform for your blog, diary, and tweets"
        url="https://giki.app"
        subject="blog, diary and tweets in one place"
        title={`${i18n.t('about')} 叽喳・Giki`}
      />
      <AboutPage />
    </>
  )
}

export default About
