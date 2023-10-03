import AgreementPage from '../agreement/Agreement'
import Header from '../../components/Head'

function Privacy() {
  return (
    <>
      <Header
        keywords="expense tracking, voice, natural language"
        description="ExpenSee, a secure expense tracking app using voice and natural language."
        summary="ExpenSee, a secure expense tracking app using voice and natural language."
        url="https://expensee.app"
        subject="ExpenSee, See Your Expenses"
        title="ExpenSee"
      />
      <AgreementPage />
    </>
  )
}

export default Privacy
