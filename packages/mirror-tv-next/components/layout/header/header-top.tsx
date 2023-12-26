import Image from 'next/image'
import Link from 'next/link'
import type { Sponsor } from '~/graphql/query/sponsors'
import logoSrc from '~/public/icons/mnews-logo.svg'
import styles from './header-top.module.css'

type HeaderTopProps = {
  sponsors: Sponsor[]
}

export default function HeaderTop({ sponsors }: HeaderTopProps) {
  console.log(sponsors)
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <Image src={logoSrc} alt="mnews logo" priority />
      </Link>
    </div>
  )
}
