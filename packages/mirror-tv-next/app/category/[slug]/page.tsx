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
import UiFeaturePost from '~/components/category/ui-feature-post'
import PostsListManager from '~/components/category/posts-list-manager'
import { formatArticleCard, FormattedPostCard } from '~/utils'
import { getGcsJsonUrl } from '~/utils'
import axios from 'axios'
import UiListPostsAside from '~/components/shared/ui-list-posts-aside'
import { notFound } from 'next/navigation'

export const revalidate = GLOBAL_CACHE_SETTING

async function fetchCategoryData(slug: string): Promise<Category> {
  const client = getClient()
  try {
    const { data } = await client.query<{
      allCategories: Category[]
    }>({
      query: fetchCategoryBySlug,
      variables: {
        slug,
      },
    })
    return data?.allCategories?.[0] ?? { name: '', slug: '' }
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
    return { name: '', slug: '' }
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const categoryData = await fetchCategoryData(slug)

  return {
    metadataBase: new URL(`https://${SITE_URL}`),
    title: `${categoryData.name} - 鏡新聞`,
    openGraph: {
      title: `${categoryData.name} - 鏡新聞`,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const PAGE_SIZE = 12
  let categoryData: Category = { name: '', slug: '' }
  let latestPosts: FormattedPostCard[] = []
  let postsCount: number = 0
  let categoryPosts: FormattedPostCard[] = []
  let popularPosts: FormattedPostCard[] = []

  const client = getClient()

  categoryData = await fetchCategoryData(params.slug)
  if (!categoryData.name) return notFound()

  const fetchInitPostsList = () => {
    return fetchPostsItems({
      page: 0,
      categorySlug: categoryData.slug,
      pageSize: PAGE_SIZE,
      isWithCount: true,
    })
  }

  const fetchLatestPosts = () =>
    client.query<{
      allPosts: PostCardItem[]
    }>({
      query: getLatestPosts,
      variables: {
        first: 5,
      },
    })

  const fetchPopularPosts = () => axios.get(getGcsJsonUrl('/popularlist'))

  const responses = await Promise.allSettled([
    fetchInitPostsList(),
    fetchLatestPosts(),
    fetchPopularPosts(),
  ])

  const handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      if ('data' in response.value) {
        // handle gql requests
        return response.value.data
      }
      return response.value
    } else if (response.status === 'rejected') {
      const { graphQLErrors, clientErrors, networkError } = response.reason
      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs while fetching data for category page'
      )

      console.log(
        JSON.stringify({
          severity: 'ERROR',
          message: errors.helpers.printAll(
            annotatingError,
            {
              withStack: true,
              withPayload: true,
            },
            0,
            0
          ),
          debugPayload: {
            graphQLErrors,
            clientErrors,
            networkError,
          },
        })
      )
      throw new Error('Error occurs while fetching data.')
    }
  })

  const categoryPostsData = handledResponses[0] ?? {
    allPosts: [],
    _allPostsMeta: { count: 0 },
  }
  postsCount =
    '_allPostsMeta' in categoryPostsData
      ? categoryPostsData?._allPostsMeta?.count
      : 0
  categoryPosts =
    'allPosts' in categoryPostsData
      ? categoryPostsData?.allPosts.map((post: PostCardItem) =>
          formatArticleCard(post)
        )
      : []

  const latestPostsData = handledResponses[1] ?? { allPosts: [] }
  latestPosts =
    'allPosts' in latestPostsData
      ? latestPostsData.allPosts.map((post: PostCardItem) =>
          formatArticleCard(post)
        )
      : []

  const popularPostsData = handledResponses[2] ?? { report: [] }
  popularPosts =
    'report' in popularPostsData
      ? popularPostsData.report.map((post: PostCardItem) =>
          formatArticleCard(post)
        )
      : []

  return (
    <section className={styles.category}>
      <main className={styles.main}>
        <UiHeadingBordered title={categoryData.name} />
        {postsCount !== 0 && (
          <>
            <UiFeaturePost post={categoryPosts[0]} />
            <PostsListManager
              categorySlug={categoryData.slug}
              pageSize={PAGE_SIZE}
              postsCount={postsCount}
              initPostsList={categoryPosts.slice(1)}
            />
          </>
        )}
      </main>
      <aside className={styles.aside}>
        <UiListPostsAside
          listTitle="熱門新聞"
          page="category"
          listData={popularPosts}
        />
        <UiListPostsAside
          listTitle="最新新聞"
          page="category"
          listData={latestPosts}
        />
      </aside>
    </section>
  )
}
