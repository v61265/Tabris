import axios, { AxiosResponse } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import {
  GLOBAL_CACHE_SETTING,
  HEADER_JSON_URL,
} from '~/constants/environment-variables'
import logoSrc from '~/public/icons/mnews-logo.svg'
import styles from './main-header.module.css'

export default async function MainHeader() {
  try {
    const response: AxiosResponse = await axios.get(HEADER_JSON_URL)
    // Access the headers from Axios response
    const headers = response.headers
    // Set Cache-Control header in the headers object
    headers['Cache-Control'] = GLOBAL_CACHE_SETTING

    const data = response.data
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
