import i18n from 'i18n-js'
import Header from '../Head'
import pageStyles from '../../styles/Page.module.css'

export default function Layout({ children }) {
  return (
    <div className={pageStyles.Container}>
      <Header
        keywords={i18n.t('SiteKeyWords')}
        description={i18n.t('SiteDescription')}
        summary={i18n.t('SiteDescription')}
        url="https://expensee.app"
        subject={i18n.t('SiteSubject')}
        title="ExpenSee"
      />
      <main>{children}</main>
    </div>
  )
}
