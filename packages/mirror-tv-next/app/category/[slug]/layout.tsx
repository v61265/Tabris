import { getClient } from '~/apollo-client'
import errors from '@twreporter/errors'
import styles from '~/styles/pages/category-layout.module.scss'
import { getLatestPosts, PostCardItem } from '~/graphql/query/posts'
import { formatArticleCard, FormattedPostCard } from '~/utils'
import UiListPostsAside from '~/components/shared/ui-list-posts-aside'
import {
  POPULAR_POSTS_URL,
  GLOBAL_CACHE_SETTING,
} from '~/constants/environment-variables'
import { ApolloQueryResult } from '@apollo/client'

export default async function CategoryPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let latestPosts: FormattedPostCard[] = []
  let popularPosts: FormattedPostCard[] = []

  const client = getClient()

  const fetchLatestPosts = () =>
    client.query<{
      allPosts: PostCardItem[]
    }>({
      query: getLatestPosts,
      variables: {
        first: 5,
      },
    })

  const fetchPopularPosts = () =>
    fetch(POPULAR_POSTS_URL, {
      next: { revalidate: GLOBAL_CACHE_SETTING },
    }).then((res) => res.json())

  const responses = await Promise.allSettled([
    fetchLatestPosts(),
    fetchPopularPosts(),
  ])

  const handledResponse = <
    T extends Record<string, unknown>,
    U extends PromiseSettledResult<unknown>,
    V
  >(
    response: U,
    callback: (value: T | undefined) => V
  ): V | undefined => {
    if (response.status === 'fulfilled') {
      return callback(response.value)
    } else if (response.status === 'rejected') {
      const { graphQLErrors, clientErrors, networkError } = response.reason
      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs while fetching category data in category page'
      )

      console.error(
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
      return callback(undefined)
    }
  }

  latestPosts =
    handledResponse<
      { data: { allPosts: PostCardItem[] } },
      PromiseSettledResult<ApolloQueryResult<{ allPosts: PostCardItem[] }>>,
      FormattedPostCard[]
    >(responses[0], (latestPostsData) => {
      return (
        latestPostsData?.data?.allPosts?.map((post) =>
          formatArticleCard(post)
        ) ?? []
      )
    }) ?? []

  popularPosts =
    handledResponse<
      {
        report: PostCardItem[]
        start_date: string
        end_date: string
        generate_time: string
      },
      PromiseSettledResult<
        () => Promise<{
          report: PostCardItem[]
          start_date: string
          end_date: string
          generate_time: string
        }>
      >,
      FormattedPostCard[]
    >(responses[1], (popularPostsData) => {
      return (
        popularPostsData?.report.map((post: PostCardItem) =>
          formatArticleCard(post)
        ) ?? []
      )
    }) ?? []

  return (
    <main className={styles.category}>
      {children}
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
    </main>
  )
}
