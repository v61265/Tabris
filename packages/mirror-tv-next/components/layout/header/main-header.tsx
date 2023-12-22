import errors from '@twreporter/errors'
import Image from 'next/image'
import Link from 'next/link'
import { getClient } from '~/apollo-client'
import { sponsors } from '~/graphql/query/sponsors'

import logoSrc from '~/public/icons/mnews-logo.svg'
import styles from './main-header.module.css'

export default async function MainHeader() {
  // Get sponsors data from gql
  const client = getClient()
  try {
    const { data } = await client.query({
      query: sponsors,
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
