import errors from '@twreporter/errors'
import { PostByTagName } from '~/graphql/query/posts'
import styles from '~/styles/pages/tag-page.module.scss'
import {
  GLOBAL_CACHE_SETTING,
  SITE_URL,
} from '~/constants/environment-variables'
import PostsListManager from '~/components/tag/posts-list-manager'
import { fetchPostsItems } from '~/components/tag/action'
import type { Metadata } from 'next'

export const revalidate = GLOBAL_CACHE_SETTING

export async function generateMetadata({
  params,
}: {
  params: { name: string }
}): Promise<Metadata> {
  const { name } = params
  const tagName: string = decodeURIComponent(name)

  return {
    metadataBase: new URL(`https://${SITE_URL}`),
    title: `${tagName} - 鏡新聞`,
    openGraph: {
      title: `${tagName} - 鏡新聞`,
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
  let postsList: PostByTagName[] = []
  let postsCount: number = 0

  try {
    const postsResponse = await fetchPostsItems({
      page: 0,
      tagName,
      pageSize: PAGE_SIZE,
      isWithCount: true,
    })
    if (!postsResponse.allPosts) return
    postsList = postsResponse?.allPosts ?? []
    postsCount = postsResponse?._allPostsMeta?.count ?? 0
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data for header'
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

    throw new Error('Error occurs while fetching data.')
  }

  return (
    <section className={styles.tag}>
      <div className={styles.tagWrapper}>
        <h1 className={styles.tagName}>{tagName}</h1>
        {postsCount === 0 ? (
          <p>目前沒有相關的文章</p>
        ) : (
          <PostsListManager
            tagName={tagName}
            pageSize={PAGE_SIZE}
            postsCount={postsCount}
            initPostsList={postsList}
          />
        )}
      </div>
    </section>
  )
}
