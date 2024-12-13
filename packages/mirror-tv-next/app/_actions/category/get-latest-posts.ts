'use server'

import { getClient } from '~/apollo-client'
import { getLatestPosts, type PostCardItem } from '~/graphql/query/posts'

type QueryType = {
  allPosts: PostCardItem[]
}

/**
 * Fetches the latest 5 posts to be displayed in the aside section in category page.
 */
export async function getLatestPostsForAside() {
  const client = getClient()
  const firstNItems = 5
  const filteredSlugList: string[] = []
  const queryArgs = {
    query: getLatestPosts,
    variables: {
      first: firstNItems,
      filteredSlug: filteredSlugList,
    },
  }

  const responses = await client.query<QueryType>(queryArgs)

  return responses
}
