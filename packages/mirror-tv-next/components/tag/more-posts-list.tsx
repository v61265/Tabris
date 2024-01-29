'use client'
import UiLoadMreButton from '../shared/ui-load-more-button'
import { PostByTagName } from '~/graphql/query/posts'
import { useState } from 'react'
import { fetchPostsItems } from '~/components/tag/action'
import styles from '~/styles/components/tag/more-posts-list.module.scss'
import PostsList from './posts-list'

type UiMoreTagListProps = {
  tagName: string
  pageSize: number
  postsCount: number
}

export default function MorePostsList({
  tagName,
  pageSize,
  postsCount,
}: UiMoreTagListProps) {
  const [page, setPage] = useState(1)
  const [postsList, setPostsList] = useState<PostByTagName[]>([])

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
      {postsList[0] && (
        <section className={styles.list}>
          <PostsList postsList={postsList} keyName={`page=${page}`} />
        </section>
      )}
      {postsCount > pageSize * page && (
        <div className={styles.btnWrapper}>
          <UiLoadMreButton title="看更多" onClick={handleClickLoadMore} />
        </div>
      )}
    </>
  )
}
