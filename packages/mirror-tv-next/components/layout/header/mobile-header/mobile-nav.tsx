import Image from 'next/image'
import Link from 'next/link'
import type { Category, Show, Sponsor } from '~/types/header'

import styles from '~/styles/components/layout/header/mobile-header/mobile-nav.module.scss'
import SideMenu from './side-menu'

type MobileNavProps = {
  categories: Category[]
  shows: Show[]
  sponsors: Sponsor[]
}

export default function MobileNav({
  categories,
  shows,
  sponsors,
}: MobileNavProps) {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/icons/mnews-logo-white.svg"
            alt="mnews logo"
            width={162}
            height={30}
            priority
          />
        </Link>
      </div>
      <SideMenu categories={categories} shows={shows} sponsors={sponsors} />
    </div>
  )
}
