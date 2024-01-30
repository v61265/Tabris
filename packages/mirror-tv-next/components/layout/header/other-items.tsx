import Image from 'next/image'
import Link from 'next/link'
import xSrc from 'public/icons/icon-x.svg'
import { HEADER_BOTTOM_LINKS } from '~/constants/constant'
import fbSrc from '~/public/icons/icon-fb.svg'
import igSrc from '~/public/icons/icon-ig.svg'
import lineSrc from '~/public/icons/icon-line.svg'
import styles from '~/styles/components/layout/header/other-items.module.scss'

export default function OtherItems(): JSX.Element {
  return (
    <div className={styles.otherItemsWrapper}>
      <ul className={styles.items}>
        {[
          { href: HEADER_BOTTOM_LINKS.ombuds, text: '公評人專區' },
          { href: HEADER_BOTTOM_LINKS.anchorperson, text: '鏡主播' },
          { href: HEADER_BOTTOM_LINKS.about, text: '關於我們' },
          {
            href: HEADER_BOTTOM_LINKS.fb,
            iconSrc: fbSrc,
            alt: 'facebook icon',
          },
          {
            href: HEADER_BOTTOM_LINKS.line,
            iconSrc: lineSrc,
            alt: 'line icon',
          },
          {
            href: HEADER_BOTTOM_LINKS.ig,
            iconSrc: igSrc,
            alt: 'instagram icon',
          },
          {
            href: HEADER_BOTTOM_LINKS.x,
            iconSrc: xSrc,
            alt: 'x(former twitter) icon',
          },
        ].map((item, index) => (
          <li key={index} className={item.iconSrc ? styles.icon : styles.li}>
            <Link
              href={item.href}
              target={item.iconSrc ? '_blank' : undefined}
              rel={item.iconSrc ? 'noopener noreferrer' : undefined}
            >
              {item.iconSrc ? (
                <Image src={item.iconSrc} alt={item.alt || ''} />
              ) : (
                item.text
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
