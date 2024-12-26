import styles from '~/styles/pages/tag-page.module.scss'
import {
  GLOBAL_CACHE_SETTING,
  SITE_URL,
} from '~/constants/environment-variables'
import PostsListManager from '~/components/tag/posts-list-manager'
import { fetchPostsItems } from '~/app/_actions/tag/posts-by-tag'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { GPTPlaceholderDesktop } from '~/components/ads/gpt/gpt-placeholder'

const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))

export const revalidate = GLOBAL_CACHE_SETTING

export async function generateMetadata({
  params,
}: {
  params: { name: string }
}): Promise<Metadata> {
  const { name } = params
  const tagName: string = decodeURIComponent(name)

  return {
    metadataBase: new URL(SITE_URL),
    title: `${tagName} - 鏡新聞`,
    openGraph: {
      title: `${tagName} - 鏡新聞`,
      images: {
        url: '/images/default-og-img.jpg',
      },
    },
  }
}

export default async function TagPage({
  params,
}: {
  params: { name: string }
}) {
  const PAGE_SIZE = 12
  const tagName: string = decodeURIComponent(params.name)

  const response = await fetchPostsItems({
    postPage: 0,
    externalPage: 0,
    tagName,
    pageSize: PAGE_SIZE,
    isWithCount: true,
    isTakeExternal: true,
    isTakePost: true,
  })

  const initPostsList = response.allPosts ?? []
  const postsCount = response._allPostsMeta?.count ?? 0
  const initExternalsList = response.allExternals ?? []
  const externalsCount = response._allExternalsMeta?.count ?? 0

  return (
    <section className={styles.tag}>
      <GPTPlaceholderDesktop>
        <p>廣告</p>
        <GPTAd pageKey="all" adKey="PC_HD" />
      </GPTPlaceholderDesktop>
      <div className={styles.tagWrapper}>
        <h1 className={styles.tagName}>{tagName}</h1>
        {postsCount + externalsCount === 0 ? (
          <p>目前沒有相關的文章</p>
        ) : (
          <PostsListManager
            tagName={tagName}
            pageSize={PAGE_SIZE}
            postsCount={postsCount}
            initPostsList={initPostsList}
            externalsCount={externalsCount}
            initExternalsList={initExternalsList}
          />
        )}
      </div>
    </section>
  )
}
