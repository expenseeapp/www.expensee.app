import AgreementPage from './Agreement'
import Header from '../../components/Head'
import i18n from 'i18n-js'

function Agreement() {
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
      <AgreementPage />
    </>
  )
}

export default Agreement
