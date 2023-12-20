import Image from 'next/image'
import Link from 'next/link'
import logoSrc from '~/public/icons/mnews-logo.svg'
import styles from './main-header.module.css'

export default function MainHeader(): JSX.Element {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={logoSrc} alt="mnews logo" priority />
      </Link>
      <ul>
        <li>
          <Link href="/category/video">影音</Link>
        </li>
      </ul>
    </header>
  )
}
