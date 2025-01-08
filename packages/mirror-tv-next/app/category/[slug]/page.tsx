import errors from '@twreporter/errors'
import axios from 'axios'
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
  let postsCount: number = 0
  let categoryPosts: FormattedPostCard[] = []
  let salePosts: FormattedPostCard[] = []
  let featurePost: FeaturePost | null = null
  let externals: FormattedPostCard[] = []
  let externalsCount: number = 0

  categoryData = await fetchCategoryData(params.slug)
  if (!categoryData.name) return notFound()

  try {
    const {
      data: { allPosts },
    } = await axios.get(FEATURE_POSTS_URL)
    featurePost = allPosts.find((post: FeaturePost) =>
      post.categories.some((category) => category.name === categoryData.name)
    )
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching feature posts data in category page'
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

  const fetchCategoryPosts = () =>
    fetchPostsByCategory({
      page: 0,
      categorySlug: categoryData.slug,
      pageSize: PAGE_SIZE,
      isWithCount: true,
      filteredSlug: featurePost ? [featurePost.slug] : [],
    })
  const fetchCategoryExternals = () =>
    fetchExternalsByCategory({
      page: 0,
      categorySlug: categoryData.slug,
      pageSize: PAGE_SIZE,
      isWithCount: true,
      filteredSlug: featurePost ? [featurePost.slug] : [],
    })
  const fetchSalesPosts = () => fetchSales({ take: 4, pageName: 'category' })

  const [postsResult, externalsResult, salesResult] = await Promise.allSettled([
    fetchCategoryPosts(),
    fetchCategoryExternals(),
    fetchSalesPosts(),
  ])

  categoryPosts = handleResponse(
    postsResult,
    (
      postResponse: Awaited<ReturnType<typeof fetchCategoryPosts>> | undefined
    ) => {
      postsCount = postResponse?._allPostsMeta?.count ?? 0
      return (
        postResponse?.allPosts?.map((post) => formatArticleCard(post)) ?? []
      )
    },
    'Error occurs while fetching category posts data in category page'
  )

  externals = handleResponse(
    externalsResult,
    (
      response: Awaited<ReturnType<typeof fetchCategoryExternals>> | undefined
    ) => {
      externalsCount = response?._allExternalsMeta?.count ?? 0
      return (
        response?.allExternals?.map((post) => formatArticleCard(post)) ?? []
      )
    },
    'Error occurs while fetching category externals data in category page'
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
  const salesPostsInsertIndex = [2, 4, 8, 10].slice(0, salesLength)
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
            postsCount={postsCount + externalsCount}
            initPostsList={renderedPostsListInit}
            filteredSlug={featurePost ? [featurePost.slug] : []}
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
