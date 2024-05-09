import { ReactNode } from 'react'
import styles from '~/styles/components/ads/gpt-ad/gpt-placeholder.module.scss'

interface GPTPlaceholderProps {
  children: ReactNode
}

const GPTPlaceholderMobileAndTablet = ({
  children,
}: GPTPlaceholderProps): JSX.Element => {
  return <div className={`${styles.gptAdContainerMb}`}>{children}</div>
}
const GPTPlaceholderDesktop = ({
  children,
}: GPTPlaceholderProps): JSX.Element => {
  return <div className={`${styles.gptAdContainerPc}`}>{children}</div>
}

export { GPTPlaceholderMobileAndTablet, GPTPlaceholderDesktop }
