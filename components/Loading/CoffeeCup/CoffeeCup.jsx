import React from 'react'
import styles from './CoffeeCup.module.css'
import { useTheme } from 'next-themes'

const CoffeeCup = () => {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  return (
    <div className="grid place-items-center h-screen">
      <div className={dark ? styles.DarkCup : styles.Cup} />
    </div>
  )
}

export default CoffeeCup
