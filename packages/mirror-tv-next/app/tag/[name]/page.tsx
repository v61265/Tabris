import { getClient } from '~/apollo-client'
import errors from '@twreporter/errors'
import { postsByTagName, PostByTagName } from '~/graphql/query/posts'
import { FILTERED_SLUG } from '~/constants/constant'
import tagStyles from '~/styles/pages/tag.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import { formatePostImage } from '~/utils'

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
    <section className={tagStyles.tag}>
      <div className={tagStyles.tagWrapper}>
        <h1 className={tagStyles.tagName}>{tagName}</h1>
        {postsCount === 0 ? (
          <p>目前沒有相關的文章</p>
        ) : (
          <ol className={tagStyles.posts}>
            {formattedPostsList.map((postItem) => {
              return (
                <li key={postItem.slug} className={tagStyles.postsItem}></li>
              )
            })}
            <div className="position-correct" />
          </ol>
        )}
      </div>
    </section>
  )
}
