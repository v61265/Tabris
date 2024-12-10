'use server'

import { getClient } from '~/apollo-client'
import { getLatestPosts, PostCardItem } from '~/graphql/query/posts'

type QueryType = {
  allPosts: PostCardItem[]
}

/**
 * Fetches the latest 5 posts to be displayed in the aside section in category page.
 */
export default async function getLatestPostsForAside() {
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

  const fetchLatestPosts = async () => client.query<QueryType>(queryArgs)
  const responses = await fetchLatestPosts()

  return responses
}
