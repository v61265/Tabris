import Image from 'next/image'
import Link from 'next/link'
import styles from './_styles/header-top.module.scss'
import HeaderSearchBar from './header-search-bar'

export default function HeaderTop() {
  return (
    <div className={styles.wrapper}>
      <div className={[styles.logo, 'top-wrapper__left'].join(' ')}>
        <Link href="/" className="logo">
          <Image
            src="/icons/mnews-logo.svg"
            alt="mnews logo"
            priority
            width={192}
            height={36}
          />
        </Link>
      </div>
      <HeaderSearchBar />
    </div>
  )
}
