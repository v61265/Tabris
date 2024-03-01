'use client'
import UiLoadMoreButton from '../shared/ui-load-more-button'
import { PostCardItem } from '~/graphql/query/posts'
import { useState } from 'react'
import { fetchPostsItems } from '~/components/category/action'
import styles from '~/styles/components/category/posts-list-manager.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import { formatArticleCard, FormattedPostCard } from '~/utils'

type PostsListManagerProps = {
  categorySlug: string
  pageSize: number
  postsCount: number
  initPostsList: FormattedPostCard[]
}

export default function PostsListManager({
  categorySlug,
  pageSize,
  postsCount,
  initPostsList,
}: PostsListManagerProps) {
  const [page, setPage] = useState(1)
  const [postsList, setPostsList] = useState<FormattedPostCard[]>([
    ...initPostsList,
  ])

  const formattedPostsList = (list: PostCardItem[]) =>
    list.map((post) => formatArticleCard(post))

  const handleClickLoadMore = async () => {
    const { allPosts: newPosts } = await fetchPostsItems({
      page,
      categorySlug,
      pageSize,
      isWithCount: false,
    })
    if (!newPosts) return
    setPage((page) => page + 1)
    setPostsList((oldPost) => [...oldPost, ...formattedPostsList(newPosts)])
  }

  return (
    <>
      <section className={styles.list}>
        <ol className={styles.posts}>
          {postsList?.map((postItem) => {
            return (
              <li key={postItem.slug}>
                <UiPostCard
                  href={postItem.href}
                  images={postItem.images}
                  title={postItem.name}
                  date={postItem.publishTime}
                  postStyle={postItem.style}
                  mobileLayoutDirection="row"
                />
              </li>
            )
          })}
        </ol>
      </section>
      {postsCount - 1 > pageSize * page && (
        <div className={styles.btnWrapper}>
          <UiLoadMoreButton title="看更多" onClick={handleClickLoadMore} />
        </div>
      )}
    </>
  )
}
