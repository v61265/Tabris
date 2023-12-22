import errors from '@twreporter/errors'
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
  // Get header data from json file
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

  // Get sponsors data from gql
  const client = getClient()
  try {
    const { data } = await client.query({
      query: GET_SPONSOR,
    })
    console.log(data)
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching sponsors data for header'
    )

    // All exceptions that include a stack trace will be
    // integrated with Error Reporting.
    // See https://cloud.google.com/run/docs/error-reporting
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingError, {
          withStack: false,
          withPayload: true,
        }),
      })
    )

    throw new Error('Error occurs while fetching data.')
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
