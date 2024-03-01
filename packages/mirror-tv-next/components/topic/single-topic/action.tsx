'use server'
import errors from '@twreporter/errors'
import { getClient } from '~/apollo-client'
import type { Post } from '~/graphql/query/topic'
import { fetchPostItemsByTopicSlug } from '~/graphql/query/topic'

type Props = {
  page: number
  pageSize: number
  slug: string
}

type TopicResponse = {
  topic: {
    items: Post[]
  }[]
}

async function fetchTopicItems({ page, pageSize, slug }: Props): Promise<{
  items: Post[]
}> {
  const client = getClient()
  try {
    const { data } = await client.query<TopicResponse>({
      query: fetchPostItemsByTopicSlug,
      variables: {
        topicSlug: slug,
        first: pageSize,
        skip: (page - 1) * pageSize,
      },
    })
    return { items: data.topic[0].items }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching topic post items'
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

export { fetchTopicItems }
