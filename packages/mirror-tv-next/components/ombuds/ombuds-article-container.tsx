import type { Post } from '~/graphql/query/ombuds'
import { fetchOmbudsPosts } from '~/components/ombuds/action'
import MoreItemsManager from '~/components/ombuds/more-items-manager'

export default async function OmbudsArticleContainer() {
  const PAGE_SIZE = 5
  const filteredSlugArr: string[] = [
    'biography',
    'complaint',
    'reports',
    'law',
    'standards',
    'faq',
  ]
  const countOrNot: boolean = true
  let postsList: Post[] = []

  try {
    const postsData = await fetchOmbudsPosts({
      page: 1,
      pageSize: PAGE_SIZE,
      slug: filteredSlugArr,
      isWithCount: countOrNot,
    })
    console.log(postsData)

    postsList = postsData.items
  } catch (error) {
    console.error('Error fetching Ombuds Articles:', error)
  }

  return (
    <div>
      <h3>公評人最新消息</h3>
      <MoreItemsManager
        initialPostItems={postsList}
        slug={filteredSlugArr}
        isWithCount={countOrNot}
      />
    </div>
  )
}
