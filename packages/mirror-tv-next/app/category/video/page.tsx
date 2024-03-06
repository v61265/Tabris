import type { Metadata } from 'next'
import {
  GLOBAL_CACHE_SETTING,
  SITE_URL,
  POPULAR_VIDEOS_JSON_URL,
} from '~/constants/environment-variables'
import { handleResponse, formatArticleCard } from '~/utils'
import type { Category } from '~/graphql/query/category'
import { fetchFeatureCategories } from '~/graphql/query/categories'
import { getClient } from '~/apollo-client'

export const revalidate = GLOBAL_CACHE_SETTING

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_URL}`),
  title: '影音 - 鏡新聞',
  description: '最新最熱門，深入淺出的影音新聞。',
  openGraph: {
    title: '影音 - 鏡新聞',
    description: '最新最熱門，深入淺出的影音新聞。',
  },
}

type RowPopularVideoData = {
  report: {
    id: string
    name: string
    publishTime: string
    slug: string
    source?: string
    heroImage: {
      urlMobileSized: string
      urlTinySized: string
    }
  }[]
}

export default async function CategoryPage() {
  let popularVideos = []
  // let categoryPosts = []
  let allCategories: Category[] = []

  const client = getClient()

  const fetchAllCategory = () =>
    client.query<{
      allCategories: Category[]
    }>({
      query: fetchFeatureCategories,
    })

  const fetchPopularPosts = () =>
    fetch(POPULAR_VIDEOS_JSON_URL, {
      next: { revalidate: GLOBAL_CACHE_SETTING },
    }).then((res) => {
      // use type assertion to eliminate any
      return res.json() as unknown as RowPopularVideoData
    })

  const responses = await Promise.allSettled([
    fetchAllCategory(),
    fetchPopularPosts(),
  ])

  allCategories = handleResponse(
    responses[0],
    (
      latestPostsData: Awaited<ReturnType<typeof fetchAllCategory>> | undefined
    ) => {
      console.log(latestPostsData?.data)
      return latestPostsData?.data?.allCategories ?? []
    }
  )

  popularVideos = handleResponse(
    responses[1],
    (
      popularPostsData:
        | Awaited<ReturnType<typeof fetchPopularPosts>>
        | undefined
    ) => {
      // post in json doesn't have 'style' attribute
      return (
        popularPostsData?.report?.map((post) =>
          formatArticleCard({ ...post, style: 'article' })
        ) ?? []
      )
    }
  )

  console.log(allCategories, popularVideos)

  // const fetchVideoPostsByCategory = () =>
  //   client.query<{
  //     allPosts: Category[]
  //   }>({
  //     query: fetchFeatureCategories,
  //   })

  return <main>VideoPage</main>
}
