import { fetchTopicItems } from '~/components/topic/single-topic/action'
import type { Post } from '~/graphql/query/topic'
import styles from '~/styles/components/topic/single-topic/topic-post-items.module.scss'

type Props = {
  slug: string
  itemsCount: number
}

export default async function TopicPostItems({ slug, itemsCount }: Props) {
  const PAGE_SIZE = 12
  let itemsList: Post[] = []

  console.log(itemsCount)

  try {
    const data = await fetchTopicItems({
      page: 1,
      pageSize: PAGE_SIZE,
      slug: slug,
    })

    itemsList = data.items

    console.log(itemsList)
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <ul className={styles.postItemWrapper}>
      <li>Post item</li>
    </ul>
  )
}
