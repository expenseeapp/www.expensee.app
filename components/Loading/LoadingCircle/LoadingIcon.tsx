import styles from './LoadingIcon.module.css'

interface LoaderOptions {
  color?: string
  size?: string
}

const LoadingIcon = (options: LoaderOptions) => {
  const { color } = options
  if (color === 'red') {
    return <div className={styles.red}></div>
  }

  return <div className={styles.loader}></div>
}

export default LoadingIcon
