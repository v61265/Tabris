import Image from 'next/image'
import Link from 'next/link'
import type { Sponsor } from '~/graphql/query/sponsors'
import styles from './_styles/header-top.module.scss'

type HeaderTopProps = {
  sponsors: Sponsor[]
}

export default function HeaderTop({ sponsors }: HeaderTopProps) {
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

      <div className={styles.sponsorsWrapper}>
        {sponsors.slice(0, 3).map((sponsor) => {
          return (
            <div key={sponsor.id}>
              <Link
                href={
                  sponsor.url ? sponsor.url : `/topic/${sponsor.topic?.slug}`
                }
              >
                <Image
                  src={
                    sponsor.logo?.urlMobileSized ?? '/images/image-default.jpg'
                  }
                  alt="Sponsor Logo"
                  width={100}
                  height={52}
                  priority
                  style={{
                    width: 100,
                    height: 52,
                  }}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
