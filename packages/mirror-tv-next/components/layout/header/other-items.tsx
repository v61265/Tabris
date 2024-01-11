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
        <li className={styles.li}>
          <Link href={HEADER_BOTTOM_LINKS.ombuds}>公評人專區</Link>
        </li>
        <li className={styles.li}>
          <Link href={HEADER_BOTTOM_LINKS.anchorperson}>鏡主播</Link>
        </li>
        <li className={styles.li}>
          <Link href={HEADER_BOTTOM_LINKS.about}>關於我們</Link>
        </li>
        <li className={styles.icon}>
          <Link
            href={HEADER_BOTTOM_LINKS.fb}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={fbSrc} alt="facebook icon" />
          </Link>
        </li>
        <li className={styles.icon}>
          <Link
            href={HEADER_BOTTOM_LINKS.line}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={lineSrc} alt="line icon" />
          </Link>
        </li>
        <li className={styles.icon}>
          <Link
            href={HEADER_BOTTOM_LINKS.ig}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={igSrc} alt="instagram icon" />
          </Link>
        </li>
        <li className={styles.icon}>
          <Link
            href={HEADER_BOTTOM_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={xSrc} alt="x(former twitter) icon" />
          </Link>
        </li>
      </ul>
    </div>
  )
}
