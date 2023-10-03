import i18n from 'i18n-js'
import Header from '../../components/Head'
import SignPage from './Sign'

function Sign() {
  return (
    <>
      <Header
        keywords="blog, diary, tweets, tag"
        description="giki.app, a universal platform for your blog, diary, and tweets"
        summary="giki.app, a universal platform for your blog, diary, and tweets"
        url="https://giki.app"
        subject="blog, diary and tweets in one place"
        title={`${i18n.t('signin')} 叽喳・Giki`}
      />
      <SignPage />
    </>
  )
}

export default Sign
