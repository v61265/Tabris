import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { HEADER_JSON_URL } from '~/constants/environment-variables'
import logoSrc from '~/public/icons/mnews-logo.svg'
import styles from './main-header.module.css'

export default async function MainHeader() {
  let data

  try {
    const response = await axios.get(HEADER_JSON_URL)
    data = response.data
    console.log(data)
  } catch (error) {
    const err = error as Error
    console.error(JSON.stringify({ severity: 'ERROR', message: err.stack }))
  }

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
