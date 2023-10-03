import Cards from '../../components/Cards'
import MarkdownCard from '../../components/MarkdownCard'
import Nav from '../../components/Nav'
import React from 'react'
import pageStyles from '../../styles/Page.module.css'
import { useRouter } from 'next/router'

const agreement = `

## ExpenSee App Terms of Use

*Acceptance of Terms*

By downloading and using the ExpenSee app (the "App"), you agree to the following Terms of Use. Please read them carefully. If you do not agree to these Terms of Use, please do not use the App.

*User Responsibilities*

You agree to use the App for its intended purpose as a simple expense tracking application. Any misuse of the App that deviates from its intended purpose is prohibited.

*Intellectual Property*

You retain all ownership rights to the content you input into the App. We do not claim ownership over your data.

*Data Use and Privacy*

We respect your privacy and handle your data according to our Privacy Policy. We do not access or use your data for any purpose other than to provide you with the functionality of the App.

*Payment and Subscriptions*

Our App offers in-app purchases. The charges for these are for the fees associated with using the Large Language Model (LLM) API.

*Dispute Resolution*

If you have any disputes or issues related to the App, please contact us directly to resolve them.

*Termination of Service*

We reserve the right to terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

*Limitation of Liability and Indemnity*

We are not liable for any data loss that occurs through your use of the App. You agree to indemnify us against any claims related to your use of the App.

*Governing Law*

These Terms of Use are governed by the laws of the country in which you reside, without regard to its conflict of law principles.

*Changes to the Terms*

We reserve the right to modify these Terms of Use at any time. We will inform you of any changes by posting the new Terms of Use on this page.

Please note that this is a basic version of 'Terms of Use' and for a more comprehensive and legally sound 'Terms of Use', you should consult with a legal professional. It is also important to have a separate Privacy Policy, which is a legal requirement in many jurisdictions.
`

function Agreement() {
  const router = useRouter()

  const redirectHome = () => {
    router.push('/')
  }

  return (
    <div className={pageStyles.Container}>
      <Nav right={[]} onLogoClick={redirectHome} />
      <Cards
        // TODO compose about
        data={[agreement]}
        refreshing={false}
        renderPlaceholder={false}
        numberOfColumn={1}
        onRefresh={() => {}}
        onEndReached={() => {}}
        renderItem={(txt) => <MarkdownCard text={txt} />}
      />
    </div>
  )
}

export default Agreement
