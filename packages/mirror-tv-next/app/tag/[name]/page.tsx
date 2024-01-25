import { getClient } from '~/apollo-client'
import errors from '@twreporter/errors'
import { getPostsByTagName, PostByTagName } from '~/graphql/query/posts'
import { FILTERED_SLUG } from '~/constants/constant'
import styles from '~/styles/pages/tag-page.module.scss'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'
import MorePostsList from '~/components/tag/more-posts-list'
import UiPostsList from '~/components/tag/posts-list'

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

  const client = getClient()
  try {
    const { data: postsResponse } = await client.query<{
      allPosts: PostByTagName[]
      _allPostsMeta: { count: number }
    }>({
      query: getPostsByTagName,
      variables: {
        tagName,
        first: PAGE_SIZE,
        withCount: true,
        filteredSlug: FILTERED_SLUG,
      },
    })
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
          <UiPostsList postsList={postsList} keyName="tag" />
        )}
        {PAGE_SIZE < postsCount && (
          <MorePostsList
            tagName={tagName}
            pageSize={PAGE_SIZE}
            postsCount={postsCount}
          />
        )}
      </div>
    </section>
  )
}
