'use client'
import { useState } from 'react'
import UiPostCard from './ui-post-card'
import type { Post } from '~/graphql/query/ombuds'
import { fetchOmbudsPosts } from './action'
import styles from '~/styles/components/ombuds/more-items-manager.module.scss'

type Props = {
  slug: string[]
  isWithCount: boolean
  initialPostItems: Post[]
}

export default function MoreItemsManager({
  initialPostItems,
  slug,
  isWithCount,
}: Props) {
  const pageSize = 5

  const [page, setPage] = useState(2)
  const [postsList, setPostsList] = useState<Post[]>([...initialPostItems])

  const handleClickLoadMore = async () => {
    const { items: newPosts } = await fetchOmbudsPosts({
      page,
      pageSize,
      slug,
      isWithCount,
    })
    if (!newPosts) return
    setPage((page) => page + 1)
    setPostsList((prevPosts) => [...prevPosts, ...newPosts])
  }
  return (
    <div>
      <ul>
        {postsList.map((item, index) => (
          <li key={index}>
            <UiPostCard item={item} />
          </li>
        ))}
      </ul>
      <button className={styles.loadMoreButton} onClick={handleClickLoadMore}>
        看更多
      </button>
    </div>
  )
}
