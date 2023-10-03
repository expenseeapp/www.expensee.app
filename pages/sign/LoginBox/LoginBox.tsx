import React, { useState } from 'react'

import { gql, useMutation } from '@apollo/client'
import { useUser } from '../../../lib/contexts/user'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import styles from './LoginBox.module.css'
import RegisterButton from './RegisterButton'
import ValidateButton from './ValidateButton'
import BackButton from './BackButton'

const SIGN = gql`
  mutation SignUser($input: SignParam!) {
    sign(input: $input) {
      success
    }
  }
`

const VERIFY = gql`
  mutation Verify($input: VerificationParam!) {
    verify(input: $input) {
      token
      name
      success
      message
    }
  }
`

function LoginBox({ initStage }) {
  const router = useRouter()

  const userContext = useUser()
  const [stage, setStage] = useState(initStage)
  const [sign, signExecution] = useMutation(SIGN)
  const [verify, verifyExecution] = useMutation(VERIFY)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      onRegister()
    }
  }

  const handleCodeKeyDown = (e) => {
    if (e.key === 'Enter') {
      onValidate()
    }
  }

  const onRegister = () => {
    if (email) {
      sign({
        variables: {
          input: {
            identifier: email,
            provider: 'email',
            app: 'giki.app',
          },
        },
        onCompleted: () => {
          setStage(stage + 1)
        },
      })
    } else {
      alert('email required')
    }
  }

  const onValidate = () => {
    if (code) {
      verify({
        variables: {
          input: {
            code,
            provider: 'email',
            identifier: email,
            app: 'giki.app',
          },
        },
        onCompleted: (data) => {
          const { token, success, name } = data.verify
          if (success) {
            // TODO the status of login button should be changed to setting button
            // why it takes so long
            userContext.sign(token)
            router.push(`https://${name}.giki.app/?token=${token}`)
          }
          // TODO take care the unsuccess case
        },
      })
    } else {
      alert('code required')
    }
  }

  const onCodeChange = (e) => {
    setCode(e.target.value)
  }

  const onBack = () => {
    setStage(stage >= 1 ? stage - 1 : stage)
  }

  return (
    <div className={styles.Container}>
      <div className={styles.ContentBody}>
        {stage === 0 ? (
          <>
            <div className={styles.InputContainer}>
              <input
                type="email"
                onChange={onEmailChange}
                onKeyDown={handleEmailKeyDown}
                placeholder={'Email'}
              />
            </div>
            <div className={styles.ButtonContainer}>
              <RegisterButton loading={signExecution.loading} onRegister={onRegister} />
            </div>
          </>
        ) : stage === 1 ? (
          <>
            <div className={styles.InputContainer}>
              <input
                type="email"
                onChange={onEmailChange}
                onKeyDown={handleEmailKeyDown}
                placeholder={'Email'}
              />
              <input
                type="code"
                onChange={onCodeChange}
                onKeyDown={handleCodeKeyDown}
                placeholder={'Code'}
              />
              <p> Please check the code in your email box</p>
            </div>
            <div className={styles.ButtonContainer}>
              <BackButton onBack={onBack} />
              <ValidateButton loading={verifyExecution.loading} onValidate={onValidate} />
            </div>
          </>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

LoginBox.propTypes = {
  initStage: PropTypes.number,
}

export default LoginBox
