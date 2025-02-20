import AMPLayout from '~/components/story/amp/layout'
import { ENV } from '~/constants/environment-variables'
import { fetchStoryBySlug } from '~/app/_actions/story/fetch-story-post-by-slug'
import {
  type SinglePost,
  type FetchStoryBySlugResponse,
} from '~/graphql/query/story'
import { ServerResponse } from 'http'
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next'

export const config = { amp: true }

export default function AmpPage({
  storyData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    heroImage: {
      urlOriginal,
      urlDesktopSized,
      urlTabletSized,
      urlMobileSized,
      urlTinySized,
    },
    heroCaption,
  } = storyData

  // TODO: 整理成 function 重復使用
  const heroImage =
    urlMobileSized ??
    urlTabletSized ??
    urlDesktopSized ??
    urlOriginal ??
    urlTinySized ??
    '/images/default-og-img.jpg'
  return (
    <AMPLayout>
      <figure className="amp-hero-image">
        <amp-img src={heroImage} layout="fill" />
      </figure>
      {heroCaption && (
        <figcaption className="amp-hero-caption">{heroCaption}</figcaption>
      )}
    </AMPLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  storyData: SinglePost
}> = async (context: GetServerSidePropsContext) => {
  const { params, res } = context
  if (ENV === 'prod') {
    res.setHeader('Cache-Control', 'public, max-age=300')
  } else {
    res.setHeader('Cache-Control', 'no-store')
  }

  const { slug = '' } = params as { slug: string }

  const [storyData]: FetchStoryBySlugResponse['allPosts'] =
    await fetchStoryBySlug(slug)

  if (!storyData) {
    return { notFound: true }
  }

  const props = {
    storyData,
  }

  return { props }
}
