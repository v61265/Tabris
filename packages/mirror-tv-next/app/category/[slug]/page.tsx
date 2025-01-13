import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import GptPopup from '~/components/ads/gpt/gpt-popup'
import {
  fetchExternalsByCategory,
  fetchPostsByCategory,
} from '~/app/_actions/category/posts-by-category'
import PostsListManager from '~/components/category/posts-list-manager'
import UiFeaturePost from '~/components/category/ui-feature-post'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import {
  FEATURE_POSTS_URL,
  GLOBAL_CACHE_SETTING,
  SITE_URL,
} from '~/constants/environment-variables'
import { type Category } from '~/graphql/query/category'
import styles from '~/styles/pages/category.module.scss'
import { FeaturePost } from '~/types/api-data'
import {
  FormattedPostCard,
  formatArticleCard,
  formateDateAtTaipei,
  handleResponse,
} from '~/utils'
import { fetchSales } from '~/app/_actions/share/sales'
const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))
import { SALES_LABEL_NAME } from '~/constants/constant'
import { fetchCategoryData } from '~/app/_actions/category/category-data'
import { combineAndSortedByPublishedTime } from '~/utils/post-handler'

export const revalidate = GLOBAL_CACHE_SETTING

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const categoryData = await fetchCategoryData(slug)

  return {
    metadataBase: new URL(SITE_URL),
    title: `${categoryData.name} - 鏡新聞`,
    openGraph: {
      title: `${categoryData.name} - 鏡新聞`,
      images: {
        url: '/images/default-og-img.jpg',
      },
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const PAGE_SIZE = 12
  let categoryData: Category = { name: '', slug: '' }
  let salePosts: FormattedPostCard[] = []
  let featurePost: FeaturePost | null = null

  categoryData = await fetchCategoryData(params.slug)
  if (!categoryData.name) return notFound()

  type FeaturePostsResponse = {
    allPosts: FeaturePost[]
  }

  const fetchFeaturePosts = (): Promise<FeaturePostsResponse> =>
    fetch(FEATURE_POSTS_URL).then((res) => res.json())

  const fetchSalesPosts = () => fetchSales({ take: 4, pageName: 'category' })
  const [featurePostResult, salesResult] = await Promise.allSettled([
    fetchFeaturePosts(),
    fetchSalesPosts(),
  ])

  featurePost = handleResponse(
    featurePostResult,
    (response: Awaited<ReturnType<typeof fetchFeaturePosts>> | undefined) => {
      if (!response?.allPosts) return null
      return (
        response.allPosts.find((post: FeaturePost) =>
          post.categories.some(
            (category) => category.slug === categoryData.slug
          )
        ) ?? null
      )
    },
    'Error occurs while fetching category feature posts data in category page'
  )

  salePosts = handleResponse(
    salesResult,
    (response: Awaited<ReturnType<typeof fetchSales>> | undefined) => {
      return (
        response?.data?.allSales?.map((sale) =>
          formatArticleCard(sale?.adPost, { label: SALES_LABEL_NAME })
        ) ?? []
      )
    },
    'Error occurs while fetching category sales data in category page'
  )

  const filteredSlug = [
    featurePost ? featurePost.slug : '',
    ...(salePosts ? salePosts.map((sale) => sale.slug) : []),
  ]

  const fetchCategoryPosts = () =>
    fetchPostsByCategory({
      skip: 0,
      categorySlug: categoryData.slug,
      pageSize: PAGE_SIZE,
      isWithCount: true,
      filteredSlug: filteredSlug,
    })
  const fetchCategoryExternals = () =>
    fetchExternalsByCategory({
      skip: 0,
      categorySlug: categoryData.slug,
      pageSize: PAGE_SIZE,
      isWithCount: true,
      filteredSlug: filteredSlug,
    })

  const [postsResult, externalsResult] = await Promise.allSettled([
    fetchCategoryPosts(),
    fetchCategoryExternals(),
  ])

  const { categoryPosts, postsCount } = handleResponse(
    postsResult,
    (
      postResponse: Awaited<ReturnType<typeof fetchCategoryPosts>> | undefined
    ) => {
      const count = postResponse?._allPostsMeta?.count ?? 0
      const posts =
        postResponse?.allPosts?.map((post) => formatArticleCard(post)) ?? []
      return { categoryPosts: posts, postsCount: count }
    },
    'Error occurs while fetching category posts data in category page'
  )

  const { externals, externalsCount } = handleResponse(
    externalsResult,
    (
      response: Awaited<ReturnType<typeof fetchCategoryExternals>> | undefined
    ) => {
      return {
        externals:
          response?.allExternals?.map((post) => formatArticleCard(post)) ?? [],
        externalsCount: response?._allExternalsMeta?.count ?? 0,
      }
    },
    'Error occurs while fetching category externals data in category page'
  )

  const renderedPostsListInit: FormattedPostCard[] =
    combineAndSortedByPublishedTime([...categoryPosts, ...externals])

  const postJsonData = renderedPostsListInit?.slice(5).map((post, index) => {
    return {
      '@type': 'ListItem',
      position: index + 1 + '',
      item: {
        '@type': 'NewsArticle',
        url: `https://www.mnews.tw${post.href}`,
        headline: post.name,
        image: post.images.w3200 ?? post.images.original,
        dateCreated: formateDateAtTaipei(
          post.publishTime,
          'YYYY.MM.DD HH:mm',
          ''
        ),
      },
    }
  })

  const salesLength = salePosts?.length || 0
  const salesPostsInsertIndex = [3, 5, 9, 11].slice(0, salesLength)
  if (salesLength) {
    salesPostsInsertIndex.forEach((position, index) => {
      renderedPostsListInit.splice(
        position,
        0,
        salePosts[salesLength - 1 - index]
      )
    })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: '5',
    itemListElement: postJsonData,
  }

  return (
    <section className={styles.postsList}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GptPopup adKey="MB_CATEGORY" />
      <UiHeadingBordered title={categoryData.name} />
      {postsCount !== 0 && (
        <div className={`${styles.listWrapper} list-latest-wrapper`}>
          <UiFeaturePost post={renderedPostsListInit[0]} />
          <PostsListManager
            categorySlug={categoryData.slug}
            pageSize={PAGE_SIZE}
            postsCount={postsCount}
            externalsCount={externalsCount}
            initPostsList={renderedPostsListInit.slice(1)}
            filteredSlug={filteredSlug}
            salesCount={salesLength}
          />
        </div>
      )}
      <div className={styles.gptContainer}>
        <div className={styles.gptWrapper}>
          <GPTAd pageKey="category" adKey="PC_BT" />
        </div>
      </div>
    </section>
  )
}
