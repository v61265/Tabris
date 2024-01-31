'use client'
import UiLoadMreButton from '../shared/ui-load-more-button'
import { PostByTagName } from '~/graphql/query/posts'
import { useState } from 'react'
import { fetchPostsItems } from '~/components/tag/action'
import styles from '~/styles/components/tag/posts-list-manager.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import { formatePostImage } from '~/utils'

type PostsListManagerProps = {
  tagName: string
  pageSize: number
  postsCount: number
  initPostsList: PostByTagName[]
}

export default function PostsListManager({
  tagName,
  pageSize,
  postsCount,
  initPostsList,
}: PostsListManagerProps) {
  const [page, setPage] = useState(1)
  const [postsList, setPostsList] = useState<PostByTagName[]>([
    ...initPostsList,
  ])

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
  const formattedPostsList = (list: PostByTagName[]) =>
    list.map((post) => formatArticleCard(post))

  const handleClickLoadMore = async () => {
    const { allPosts: newPosts } = await fetchPostsItems({
      page,
      tagName,
      pageSize,
      isWithCount: false,
    })
    if (!newPosts) return
    setPage((page) => page + 1)
    setPostsList((oldPost) => [...oldPost, ...newPosts])
  }

  return (
    <>
      <section className={styles.list}>
        <ol className={styles.posts}>
          {formattedPostsList(postsList)?.map((postItem) => {
            return (
              <li key={postItem.slug}>
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
        </ol>
      </section>
      {postsCount > pageSize * page && (
        <div className={styles.btnWrapper}>
          <UiLoadMreButton title="看更多" onClick={handleClickLoadMore} />
        </div>
      )}
    </>
  )
}
