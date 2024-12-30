import {
  type HeroImage,
  fetchHeroImageBySlug as fetchHeroImageBySlugDocument,
} from '~/graphql/query/story'
import { getClient } from '~/apollo-client'
import errors from '@twreporter/errors'

export async function fetchHeroImageBySlug(slug: string): Promise<HeroImage[]> {
  const client = getClient()
  try {
    const { data } = await client.query<{
      allPosts: HeroImage[]
    }>({
      query: fetchHeroImageBySlugDocument,
      variables: {
        slug,
      },
    })
    return data.allPosts ?? []
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      `Error occurs while fetching hero image data in story page, slug: ${slug}`
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
    return []
  }
}
