'use client'
import { useState } from 'react'
import UiLoadMoreButton from '~/components/shared/ui-load-more-button'
import { fetchTopicItems } from '~/components/topic/single-topic/action'
import type { Post } from '~/graphql/query/topic'
import styles from '~/styles/components/topic/single-topic/more-items-manager.module.scss'

type Props = {
  slug: string
  itemsCount: number
  initialPostItems: Post[]
}

export default function MoreItemsManager({
  slug,
  itemsCount,
  initialPostItems,
}: Props) {
  const pageSize = 12

  const [page, setPage] = useState(2)
  const [morePostItems, setMorePostItems] = useState<Post[]>([])

  const handleClickLoadMore = async () => {
    const { items: newPosts } = await fetchTopicItems({
      page,
      pageSize,
      slug,
    })
    if (!newPosts) return
    setPage((page) => page + 1)
    setMorePostItems((prevPosts) => [...prevPosts, ...newPosts])
  }

  console.log(itemsCount)

  return (
    <ul className={styles.postItemWrapper}>
      {initialPostItems.map((item, index) => (
        <li key={index}> {item.title} </li>
      ))}
      {morePostItems.map((item, index) => (
        <li key={index}> {item.title} </li>
      ))}
      {itemsCount > pageSize * (page - 1) && (
        <div className={styles.btnWrapper}>
          <UiLoadMoreButton title="看更多" onClick={handleClickLoadMore} />
        </div>
      )}
    </ul>
  )
}
