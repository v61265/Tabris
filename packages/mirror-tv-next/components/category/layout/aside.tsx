import { getClient } from '~/apollo-client'
import errors from '@twreporter/errors'
import styles from '~/styles/components/category/layout/aside.module.scss'
import { getLatestPosts, PostCardItem } from '~/graphql/query/posts'
import { formatArticleCard, FormattedPostCard } from '~/utils'
import UiListPostsAside from '~/components/shared/ui-list-posts-aside'
import {
  POPULAR_POSTS_URL,
  GLOBAL_CACHE_SETTING,
} from '~/constants/environment-variables'

type RawPopularPost = {
  id: string
  name: string
  slug: string
  source: string
  heroImage: {
    urlMobileSized: string
    urlOriginal: string
    urlDesktopSized: string
    urlTabletSized: string
    urlTinySized: string
  }
  publishTime: string
}

type RawPopularPostData = {
  report: RawPopularPost[]
}

export default async function CategoryPageLayoutAside() {
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
    }).then((res) => {
      // use type assertion to eliminate any
      return res.json() as unknown as RawPopularPostData
    })

  const responses = await Promise.allSettled([
    fetchLatestPosts(),
    fetchPopularPosts(),
  ])

  const handleResponse = <
    T extends Record<string, unknown>,
    U extends PromiseSettledResult<T>,
    V
  >(
    response: U,
    callback: (value: T | undefined) => V
  ): V => {
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
    }
    return callback(undefined)
  }

  latestPosts = handleResponse(
    responses[0],
    (
      latestPostsData: Awaited<ReturnType<typeof fetchLatestPosts>> | undefined
    ) => {
      return latestPostsData?.data.allPosts.map(formatArticleCard) ?? []
    }
  )

  popularPosts = handleResponse(
    responses[1],
    (
      popularPostsData:
        | Awaited<ReturnType<typeof fetchPopularPosts>>
        | undefined
    ) => {
      // post in json doesn't have 'style' attribute
      return (
        popularPostsData?.report?.map((post) =>
          formatArticleCard({ ...post, style: 'article' })
        ) ?? []
      )
    }
  )

  return (
    <aside className={styles.aside}>
      <UiListPostsAside
        listTitle="熱門新聞"
        page="category"
        listData={popularPosts}
        className="aside__list-popular"
      />
      <UiListPostsAside
        listTitle="即時新聞"
        page="category"
        listData={latestPosts}
        className="aside__list-latest"
      />
    </aside>
  )
}
