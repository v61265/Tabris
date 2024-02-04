'use client'
import UiLoadMreButton from '../shared/ui-load-more-button'
import { Topic } from '~/graphql/query/topic'
import { useState } from 'react'
// import { fetchTopics } from '~/components/topic/action'
import styles from '~/styles/components/topic/topics-list-manager.module.scss'
import UiTopicCard from '~/components/topic/ui-topic-card'
import { formatePostImage } from '~/utils'
import type { ApiData } from '~/types/api-data'

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

  function handleApiData(apiData: string): ApiData[] {
    try {
      const rawString = apiData ?? ''
      const content = JSON.parse(rawString)

      return content?.filter((item: ApiData) => item) || []
    } catch {
      return []
    }
  }

  function doesHaveBrief(data: ApiData[] = []) {
    const validateArray = data.map((item) => {
      return item?.content?.length > 1 || item?.content[0]?.length > 0
    })
    return validateArray.find((item) => {
      return item
    })
  }

  function transformBrief(briefApiData = '') {
    const data: ApiData[] = briefApiData ? handleApiData(briefApiData) : []
    return data.length && doesHaveBrief(data) ? data : []
  }

  const formatArticleCard = (topic: Topic) => {
    const { id = '', slug = '', name = '', briefApiData } = topic || {}

    return {
      id,
      title: name,
      href: `/topic/${slug}`,
      brief: transformBrief(briefApiData),
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
                  formattedBrief={postItem.brief}
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
