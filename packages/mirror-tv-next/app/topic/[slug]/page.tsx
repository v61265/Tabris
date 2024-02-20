import errors from '@twreporter/errors'
import { redirect } from 'next/navigation'
import { getClient } from '~/apollo-client'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'
import type { SingleTopic } from '~/graphql/query/topic'
import { fetchPostsByTopicSlug } from '~/graphql/query/topic'

export const revalidate = GLOBAL_CACHE_SETTING

export default async function SingleTopicPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClient()
  let singleTopic: SingleTopic | undefined

  try {
    const response = await client.query({
      query: fetchPostsByTopicSlug,
      variables: {
        topicSlug: params.slug,
      },
    })
    const { topic }: { topic: SingleTopic[] } = response.data
    singleTopic = topic[0] ?? undefined

    // Throw an error if singleTopic is undefined
    if (!singleTopic) {
      throw new Error('Topic not found')
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching posts data for single topic page'
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
    redirect('/404')
  }

  return (
    <section>
      <div>{singleTopic.title}</div>
    </section>
  )
}
