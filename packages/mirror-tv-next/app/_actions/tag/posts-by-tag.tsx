'use server'
import { FILTERED_SLUG } from '~/constants/constant'
import errors from '@twreporter/errors'
import { getPostsByTagName, type PostCardItem } from '~/graphql/query/posts'
import { getClient } from '~/apollo-client'
import { getExternalsByTagName, type External } from '~/graphql/query/externals'

type FetchMoreItemsType = {
  tagName: string
  pageSize: number
  postPage: number
  isWithCount: boolean
  externalPage: number
  isTakePost: boolean
  isTakeExternal: boolean
}

async function fetchPostsItems({
  tagName,
  pageSize,
  postPage,
  isTakePost,
  isTakeExternal,
  externalPage,
  isWithCount,
}: FetchMoreItemsType): Promise<{
  allPosts?: PostCardItem[] | undefined
  _allPostsMeta?: { count: number } | undefined
  allExternals?: External[] | undefined
  _allExternalsMeta?: { count: number } | undefined
}> {
  const client = getClient()
  try {
    const fetchPosts = client.query<{
      allPosts: PostCardItem[]
      _allPostsMeta?: { count: number }
    }>({
      query: getPostsByTagName,
      variables: {
        tagName,
        first: pageSize,
        skip: postPage * pageSize,
        withCount: isWithCount,
        filteredSlug: FILTERED_SLUG,
      },
    })
    const fetchExternals = client.query<{
      allExternals: External[]
      _allExternalsMeta?: { count: number }
    }>({
      query: getExternalsByTagName,
      variables: {
        tagName,
        first: pageSize,
        skip: externalPage * pageSize,
        withCount: isWithCount,
        filteredSlug: FILTERED_SLUG,
      },
    })
    const promiseList: [
      typeof fetchPosts | null,
      typeof fetchExternals | null
    ] = [null, null]
    if (isTakePost) promiseList[0] = fetchPosts
    if (isTakeExternal) promiseList[1] = fetchExternals

    const [postRes, externalRes] = await Promise.allSettled(promiseList)

    const result: {
      allPosts?: PostCardItem[]
      _allPostsMeta?: { count: number }
      allExternals?: External[]
      _allExternalsMeta?: { count: number }
    } = {}

    if (isTakePost && postRes.status === 'fulfilled' && postRes?.value) {
      result.allPosts = postRes.value.data?.allPosts
      result._allPostsMeta = postRes.value.data?._allPostsMeta
    }
    if (
      isTakeExternal &&
      externalRes.status === 'fulfilled' &&
      externalRes?.value
    ) {
      result.allExternals = externalRes.value.data?.allExternals
      result._allExternalsMeta = externalRes.value.data?._allExternalsMeta
    }

    return result
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data for posts for tag page'
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
}

export { fetchPostsItems }
