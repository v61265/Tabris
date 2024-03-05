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
}

async function fetchPostsItems({
  page,
  categorySlug,
  pageSize,
  isWithCount,
  salePostsCount,
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
        // 第一頁因為有置頂文章，因此要多抓一篇
        first: page === 0 ? pageSize + 1 - salePostsCount : pageSize,
        skip: page === 0 ? 0 : page * pageSize + 1 - salePostsCount,
        withCount: isWithCount,
        filteredSlug: FILTERED_SLUG,
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
