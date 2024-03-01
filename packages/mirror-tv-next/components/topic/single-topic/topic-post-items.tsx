import { fetchTopicItems } from '~/components/topic/single-topic/action'
import MoreItemsManager from '~/components/topic/single-topic/more-items-manager'
import type { Post } from '~/graphql/query/topic'

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
    <MoreItemsManager
      initialPostItems={itemsList}
      slug={slug}
      itemsCount={itemsCount}
    />
  )
}
