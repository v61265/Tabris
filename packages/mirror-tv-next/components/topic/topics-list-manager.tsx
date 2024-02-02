'use client'
import UiLoadMreButton from '../shared/ui-load-more-button'
import { Topic } from '~/graphql/query/topic'
import { useState } from 'react'
// import { fetchTopics } from '~/components/topic/action'
import styles from '~/styles/components/topic/topics-list-manager.module.scss'
import UiTopicCard from '~/components/topic/ui-topic-card'
import { formatePostImage } from '~/utils'

type TopicsListManagerProps = {
  pageSize: number
  topicsCount: number
  initTopicsList: Topic[]
}

export default function TopicsListManager({
  pageSize,
  topicsCount,
  initTopicsList,
}: TopicsListManagerProps) {
  const [page, setPage] = useState(1)
  const [topicsList, setTopicsList] = useState<Topic[]>([...initTopicsList])

  const formatArticleCard = (topic: Topic) => {
    // function transformBrief(briefApiData = '') {
    //   const data = briefApiData ? handleApiData(briefApiData) : []
    //   return data.length && this.doesHaveBrief(data) ? data : []
    // }
    const { id = '', slug = '', name = '' } = topic || {}

    return {
      id,
      title: name,
      href: `/topic/${slug}`,
      // brief: transformBrief(briefApiData),
      images: formatePostImage(topic),
    }
  }
  const formattedTopicsList = (list: Topic[]) =>
    list.map((topic) => formatArticleCard(topic))

  const handleClickLoadMore = () => {}

  // const handleClickLoadMore = async () => {
  //   const { allTopics: newTopics } = await fetchTopics({
  //     page,
  //     pageSize,
  //     isWithCount: false,
  //   })
  //   if (!newTopics) return
  //   setPage((page) => page + 1)
  //   setTopicsList((oldPost) => [...oldPost, ...newTopics])
  // }

  return (
    <>
      <section className={styles.list}>
        <ol className={styles.topics}>
          {formattedTopicsList(topicsList)?.map((postItem) => {
            return (
              <li key={postItem.id}>
                <UiTopicCard
                  href={postItem.href}
                  images={postItem.images}
                  title={postItem.title}
                  formattedBrief=""
                />
              </li>
            )
          })}
        </ol>
      </section>
      {topicsCount > pageSize * page && (
        <div className={styles.btnWrapper}>
          <UiLoadMreButton title="看更多" onClick={handleClickLoadMore} />
        </div>
      )}
    </>
  )
}
