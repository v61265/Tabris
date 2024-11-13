'use server'
import errors from '@twreporter/errors'
import { getClient } from '~/apollo-client'
import type { Video } from '~/graphql/query/videos'
import { getVideoByName } from '~/graphql/query/videos'

type getVideoType = {
  name: string
  take: number
  errorMessage?: string
}

async function getVideo({
  name,
  take,
  errorMessage = '',
}: getVideoType): Promise<
  | {
      data: { allVideos: Video[] }
    }
  | undefined
> {
  const client = getClient()
  try {
    const { data } = await client.query<{ allVideos: Video[] }>({
      query: getVideoByName,
      variables: {
        name,
        take,
      },
    })
    return { data }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      errorMessage ?? `Error occurs while fetching ${name} videos in homepage`
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
  }
}

export { getVideo }
