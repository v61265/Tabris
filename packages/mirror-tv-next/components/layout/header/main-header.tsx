import errors from '@twreporter/errors'

import { getClient } from '~/apollo-client'
import MobileNav from '~/components/layout/header/mobile-header/mobile-nav'
import type { Category } from '~/graphql/query/categories'
import { categories } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'
import { shows } from '~/graphql/query/shows'
import type { Sponsor } from '~/graphql/query/sponsors'
import { sponsors } from '~/graphql/query/sponsors'

import HeaderBottom from './header-bottom'
import HeaderNav from './header-nav'
import HeaderTop from './header-top'
import styles from './main-header.module.css'

export const revalidate = 0

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

  return (
    <header className={styles.header}>
      <div className={styles.pcHeaderWrapper}>
        <HeaderTop sponsors={sponsorsData} />
        <HeaderNav categories={categoriesData} shows={showsData} />
        <HeaderBottom />
      </div>
      <div className={styles.mobHeaderWrapper}>
        <MobileNav
          categories={categoriesData}
          shows={showsData}
          sponsors={sponsorsData}
        />
      </div>
    </header>
  )
}
