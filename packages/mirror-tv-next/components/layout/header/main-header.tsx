import gql from 'graphql-tag'
import Image from 'next/image'
import Link from 'next/link'
import { getClient } from '~/apollo-client'

import axios, { AxiosResponse } from 'axios'
import {
  GLOBAL_CACHE_SETTING,
  HEADER_JSON_URL,
} from '~/constants/environment-variables'
import logoSrc from '~/public/icons/mnews-logo.svg'
import styles from './main-header.module.css'

const GET_SPONSOR = gql`
  query fetchSponsors {
    allSponsors(
      where: { state: published }
      sortBy: [sortOrder_ASC, createdAt_DESC]
    ) {
      id
      title
      url
      logo {
        urlMobileSized
      }
      mobile {
        urlMobileSized
      }
      tablet {
        urlMobileSized
      }
      topic {
        id
        slug
        name
      }
    }
  }
`

export default async function MainHeader() {
  try {
    const response: AxiosResponse = await axios.get(HEADER_JSON_URL)
    // Access the headers from Axios response
    const headers = response.headers
    // Set Cache-Control header in the headers object
    headers['Cache-Control'] = GLOBAL_CACHE_SETTING

    const headerData = response.data
    console.log(headerData)
  } catch (error) {
    const err = error as Error
    console.error(JSON.stringify({ severity: 'ERROR', message: err.stack }))
  }

  const client = getClient()
  try {
    const { data } = await client.query({ query: GET_SPONSOR }) // Make sure to pass the query object
    console.log(data)
    // Handle the received data as needed
  } catch (error) {
    console.error(error)
    // Handle errors if necessary
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
