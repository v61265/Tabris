import type { Metadata } from 'next'
import {
  GLOBAL_CACHE_SETTING,
  SITE_URL,
  POPULAR_VIDEOS_JSON_URL,
} from '~/constants/environment-variables'
import { handleResponse, formatArticleCard, FormattedPostCard } from '~/utils'
import type { Category } from '~/graphql/query/category'
import { fetchFeatureCategories } from '~/graphql/query/categories'
import { getClient } from '~/apollo-client'
import { fetchVideoPostsItems } from '~/components/category/video/action'
import styles from '~/styles/pages/category-video-page.module.scss'
import VideoPostsList from '~/components/category/video/video-posts-list'
import type { HeroImage } from '~/types/common'
import { fetchShows } from '~/graphql/query/shows'
import type { Show } from '~/graphql/query/shows'
import UiShowsList from '~/components/category/video/ui-shows-list'
import UiLinksList from '~/components/category/video/ui-links-list'

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

type ReportItem = {
  id: string
  name: string
  publishTime: string
  slug: string
  source?: string
  heroImage: HeroImage
}

type RowPopularVideoData = {
  report: ReportItem[]
}

export default async function VideoCategoryPage() {
  const PAGE_SIZE = 12
  let popularVideos: FormattedPostCard[] = []
  let categoryPosts: {
    posts: FormattedPostCard[]
    count: number
    categorySlug: string
    categoryName: string
  }[] = []
  let allCategories: Category[] = []
  let allShows: Show[] = []

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

  const fetchAllShows = () =>
    client.query<{ allShows: Show[] }>({
      query: fetchShows,
    })

  const responses = await Promise.allSettled([
    fetchAllCategory(),
    fetchPopularPosts(),
    fetchAllShows(),
  ])

  allCategories = handleResponse(
    responses[0],
    (
      latestPostsData: Awaited<ReturnType<typeof fetchAllCategory>> | undefined
    ) => {
      return latestPostsData?.data?.allCategories ?? []
    },
    'Error occurs while fetching category data in video category page'
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
          formatArticleCard({ ...post, style: 'videoNews' })
        ) ?? []
      )
    },
    'Error occurs while fetching popular videos in video category page'
  )

  allShows = handleResponse(
    responses[2],
    (data: Awaited<ReturnType<typeof fetchAllShows>> | undefined) => {
      console.log(data?.data?.allShows)
      return data?.data?.allShows ?? []
    },
    'Error occurs while fetching all shows in video category page'
  )

  const fetchVideoPostsByCategory = (slug: string) =>
    fetchVideoPostsItems({
      page: 0,
      categorySlug: slug,
      isWithCount: true,
      pageSize: PAGE_SIZE,
    })

  const videoPostsResponses = await Promise.allSettled(
    allCategories.map((category) => fetchVideoPostsByCategory(category.slug))
  )

  const getCategoryNameBySlug = (slug: string) => {
    const category = allCategories.find((category) => category.slug === slug)
    return category ? category.name : ''
  }

  categoryPosts = videoPostsResponses.map((res) => {
    return handleResponse(
      res,
      (
        videoPostsData:
          | Awaited<ReturnType<typeof fetchVideoPostsByCategory>>
          | undefined
      ) => {
        return {
          categorySlug: videoPostsData?.categorySlug ?? '',
          categoryName: getCategoryNameBySlug(
            videoPostsData?.categorySlug ?? ''
          ),
          posts: videoPostsData?.data?.allPosts?.map(formatArticleCard) ?? [],
          count: videoPostsData?.data?._allPostsMeta?.count ?? 0,
        }
      },
      'Error occurs while fetching video posts in video category page'
    )
  })
  categoryPosts = categoryPosts.filter((item) => item.count)

  return (
    <main className={styles.main}>
      <section className={styles.left}>
        {!!popularVideos.length && (
          <VideoPostsList
            initPostsList={popularVideos}
            categorySlug=""
            categoryName="熱門影音"
            pageSize={PAGE_SIZE}
            postsCount={popularVideos.length}
          />
        )}

        {categoryPosts.map((list) => {
          return (
            <VideoPostsList
              initPostsList={list.posts}
              categorySlug={list.categorySlug}
              categoryName={list.categoryName}
              pageSize={PAGE_SIZE}
              postsCount={list.count}
              key={list.categorySlug}
            />
          )
        })}
      </section>
      <aside className={styles.aside}>
        {!!allShows.length && <UiShowsList title="節目" showsList={allShows} />}
        <UiLinksList fbHref="https://www.facebook.com/mnewstw/" />
      </aside>
    </main>
  )
}
