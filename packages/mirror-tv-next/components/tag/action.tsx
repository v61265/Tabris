'use server'
import { FILTERED_SLUG } from '~/constants/constant'
import errors from '@twreporter/errors'
import { getPostsByTagName, PostByTagName } from '~/graphql/query/posts'
import { getClient } from '~/apollo-client'

async function fetchMoreItems(
  page: number,
  tagName: string,
  pageSize: number
): Promise<void | PostByTagName[]> {
  const client = getClient()
  try {
    const { data } = await client.query<{
      allPosts: PostByTagName[]
      _allPostsMeta: number
    }>({
      query: getPostsByTagName,
      variables: {
        tagName,
        first: pageSize,
        skip: page * pageSize,
        withCount: false,
        filteredSlug: FILTERED_SLUG,
      },
    })
    return data?.allPosts
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
}

export { fetchMoreItems }
