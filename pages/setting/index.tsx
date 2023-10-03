import { useEffect } from 'react'
import SettingPage from '../../components/Setting'
import { useUser } from '../../lib/contexts/user'
import LoadingCircle from '../../components/Loading/LoadingCircle'

export default function Setting() {
  const { user, signing, login } = useUser()

  useEffect(() => {
    if (!user) {
      login()
    }
  }, [])

  if (!user) {
    return null
  }
  if (signing) {
    return <LoadingCircle />
  }

  return <SettingPage viewer={user} />
}
