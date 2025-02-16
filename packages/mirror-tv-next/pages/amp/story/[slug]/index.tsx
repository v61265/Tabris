import AMPLayout from '~/components/story/amp/layout'
import { ENV } from '~/constants/environment-variables'
import { fetchStoryBySlug } from '~/app/_actions/story/fetch-story-post-by-slug'
import { type FetchStoryBySlugResponse } from '~/graphql/query/story'
import { ServerResponse } from 'http'

export const config = { amp: true }

type AmpPageProps = {
  storyData: FetchStoryBySlugResponse['allPosts']
}

export default function AmpPage({ storyData }: AmpPageProps) {
  return <AMPLayout>amp page</AMPLayout>
}

export async function getServerSideProps({
  params,
  res,
}: {
  params: { slug: string }
  res: ServerResponse
}) {
  if (ENV === 'prod') {
    res.setHeader('Cache-Control', 'public, max-age=300')
  } else {
    res.setHeader('Cache-Control', 'no-store')
  }

  const { slug } = params

  const [storyData]: FetchStoryBySlugResponse['allPosts'] =
    await fetchStoryBySlug(slug)

  if (!Object.keys(storyData).length) {
    return { notFound: true }
  }

  const props = {
    storyData: [],
  }

  return { props }
}
