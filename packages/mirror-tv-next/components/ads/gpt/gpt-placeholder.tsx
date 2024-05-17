import { ReactNode } from 'react'
import styles from './_styles/gpt-placeholder.module.scss'

interface GPTPlaceholderProps {
  children: ReactNode
}

const GPTPlaceholderMobile = ({
  children,
}: GPTPlaceholderProps): JSX.Element => {
  return <div className={`${styles.gptAdContainerMb}`}>{children}</div>
}
const GPTPlaceholderDesktop = ({
  children,
}: GPTPlaceholderProps): JSX.Element => {
  return <div className={`${styles.gptAdContainerPc}`}>{children}</div>
}

export { GPTPlaceholderMobile, GPTPlaceholderDesktop }
