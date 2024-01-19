import { getClient } from '~/apollo-client'
import errors from '@twreporter/errors'
import { postsByTagName, PostByTagName } from '~/graphql/query/posts'
import { FILTERED_SLUG } from '~/constants/constant'
import styles from '~/styles/pages/tag.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import { formatePostImage } from '~/utils'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'

export const revalidate = GLOBAL_CACHE_SETTING

export default async function TagPage({
  params,
}: {
  params: { name: string }
}) {
  const PAGE_SIZE = 12

  const tagName: string = decodeURIComponent(params.name)
  let postsList: PostByTagName[] = []
  let postsCount: number = 0

  const formatArticleCard = (post: PostByTagName) => {
    return {
      href: `/story/${post.slug}`,
      slug: post.slug,
      style: post.style,
      name: post.name,
      images: formatePostImage(post),
      publishTime: new Date(post.publishTime),
    }
  }

  const client = getClient()
  try {
    const { data: postsResponse } = await client.query<{
      allPosts: PostByTagName[]
      _allPostsMeta: number
    }>({
      query: postsByTagName,
      variables: {
        tagName,
        first: PAGE_SIZE,
        withCount: true,
        filteredSlug: FILTERED_SLUG,
      },
    })
    postsList = postsResponse?.allPosts ?? []
    postsCount = postsResponse?._allPostsMeta ?? 0
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

  const formattedPostsList = postsList.map((post) => formatArticleCard(post))

  return (
    <section className={styles.tag}>
      <div className={styles.tagWrapper}>
        <h1 className={styles.tagName}>{tagName}</h1>
        {postsCount === 0 ? (
          <p>目前沒有相關的文章</p>
        ) : (
          <ol className={styles.posts}>
            {formattedPostsList.map((postItem) => {
              return (
                <li key={postItem.slug} className={styles.postsItem}>
                  <UiPostCard
                    href={postItem.href}
                    images={postItem.images}
                    title={postItem.name}
                    date={postItem.publishTime}
                    postStyle={postItem.style}
                    mobileLayoutDirection="column"
                  />
                </li>
              )
            })}
            <div className={styles.postsPosition} />
          </ol>
        )}
      </div>
    </section>
  )
}
