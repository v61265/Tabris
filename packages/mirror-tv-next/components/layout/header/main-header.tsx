import errors from '@twreporter/errors'
import Image from 'next/image'
import Link from 'next/link'
import { getClient } from '~/apollo-client'
import type { Category } from '~/graphql/query/categories'
import { categories } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'
import { shows } from '~/graphql/query/shows'
import type { Sponsor } from '~/graphql/query/sponsors'
import { sponsors } from '~/graphql/query/sponsors'

import logoSrc from '~/public/icons/mnews-logo.svg'
import styles from './main-header.module.css'

export default async function MainHeader() {
  let sponsorsData: Sponsor[] = []
  let categoriesData: Category[] = []
  let showsData: Show[] = []

  const client = getClient()
  try {
    // Fetch sponsors
    const { data: sponsorsResponse } = await client.query<{
      allSponsors: Sponsor[]
    }>({
      query: sponsors,
    })
    sponsorsData = sponsorsResponse.allSponsors

    // Fetch categories
    const { data: categoriesResponse } = await client.query<{
      allCategories: Category[]
    }>({
      query: categories,
    })
    categoriesData = categoriesResponse.allCategories

    // Fetch shows
    const { data: showsResponse } = await client.query<{ allShows: Show[] }>({
      query: shows,
    })
    showsData = showsResponse.allShows
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data for header'
    )

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

  console.log('Sponsors:', sponsorsData)
  console.log('Categories:', categoriesData)
  console.log('Shows:', showsData)

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
