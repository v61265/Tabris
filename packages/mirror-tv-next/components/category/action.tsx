'use server'
import { FILTERED_SLUG } from '~/constants/constant'
import errors from '@twreporter/errors'
import { getPostsByCategorySlug, PostCardItem } from '~/graphql/query/posts'
import { getClient } from '~/apollo-client'

type FetchMoreItemsType = {
  page: number
  categorySlug: string
  pageSize: number
  isWithCount: boolean
  salePostsCount: number
  filteredSlug: string[]
}

async function fetchPostsItems({
  page,
  categorySlug,
  pageSize,
  isWithCount,
  salePostsCount,
  filteredSlug = [],
}: FetchMoreItemsType): Promise<{
  allPosts: PostCardItem[]
  _allPostsMeta?: { count: number }
}> {
  const client = getClient()
  try {
    const { data } = await client.query<{
      allPosts: PostCardItem[]
      _allPostsMeta?: { count: number }
    }>({
      query: getPostsByCategorySlug,
      variables: {
        categorySlug,
        first: page === 0 ? pageSize - salePostsCount : pageSize,
        skip: page === 0 ? 0 : page * pageSize - salePostsCount,
        withCount: isWithCount,
        filteredSlug: [...FILTERED_SLUG, ...filteredSlug],
      },
    })
    return data
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching category posts data in category page'
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
    throw annotatingError
  }
}

export { fetchPostsItems }
