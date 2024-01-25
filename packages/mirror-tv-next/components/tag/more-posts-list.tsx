'use client'
import UiLoadMreButton from '../shared/ui-load-more-button'
import { PostByTagName } from '~/graphql/query/posts'
import { useState } from 'react'
import { fetchMoreItems } from '~/components/tag/action'
import errors from '@twreporter/errors'
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
    try {
      const newPosts = await fetchMoreItems(page, tagName, pageSize)
      if (!newPosts) return
      setPage((page) => page + 1)
      setPostsList((oldPost) => [...oldPost, ...newPosts])
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
