import {
  GLOBAL_CACHE_SETTING,
  SITE_URL,
} from '~/constants/environment-variables'
import type { Metadata } from 'next'
import { getClient } from '~/apollo-client'
import errors from '@twreporter/errors'
import { fetchCategoryBySlug, Category } from '~/graphql/query/category'
import { getLatestPosts, PostCardItem } from '~/graphql/query/posts'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import styles from '~/styles/pages/category.module.scss'
import { fetchPostsItems } from '~/components/category/action'

export const revalidate = GLOBAL_CACHE_SETTING

// export async function generateMetadata({
//   params,
// }: {
//   params: { name: string }
// }): Promise<Metadata> {
//   const { slug } = params
//   const tagName: string = decodeURIComponent(name)

//   return {
//     metadataBase: new URL(`https://${SITE_URL}`),
//     title: `${tagName} - 鏡新聞`,
//     openGraph: {
//       title: `${tagName} - 鏡新聞`,
//     },
//   }
// }

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const PAGE_SIZE = 12
  let categoryData: Category = { name: '', slug: '' }
  let latestPosts: PostCardItem[] = []
  const client = getClient()
  try {
    const { data } = await client.query<{
      allCategories: Category[]
    }>({
      query: fetchCategoryBySlug,
      variables: {
        slug: params?.slug,
      },
    })
    categoryData = data?.allCategories?.[0]
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data for category for category page'
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
    // throw new Error('Error occurs while fetching data.')
  }

  // try {
  //   const { data } = await client.query<{
  //     allPosts: PostCardItem[]
  //   }>({
  //     query: getLatestPosts,
  //     variables: {
  //       first: 5,
  //     },
  //   })
  //   latestPosts = data?.allPosts
  // } catch (err) {
  //   const annotatingError = errors.helpers.wrap(
  //     err,
  //     'UnhandledError',
  //     'Error occurs while fetching data for category for category page'
  //   )

  //   console.error(
  //     JSON.stringify({
  //       severity: 'ERROR',
  //       message: errors.helpers.printAll(annotatingError, {
  //         withStack: false,
  //         withPayload: true,
  //       }),
  //     })
  //   )
  //   throw new Error('Error occurs while fetching data.')
  // }

  return (
    <section className={styles.category}>
      <main className={styles.main}>
        <UiHeadingBordered title={categoryData.name} />
      </main>
      <aside></aside>
    </section>
  )
}
