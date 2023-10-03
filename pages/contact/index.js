import ContactPage from './Contact'
import Header from '../../components/Head'
import i18n from 'i18n-js'

function Contact() {
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
      <ContactPage />
    </>
  )
}

export default Contact
