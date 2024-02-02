import errors from '@twreporter/errors'
import { Topic } from '~/graphql/query/topic'
import styles from '~/styles/pages/topic-page.module.scss'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'
import TopicsListManager from '~/components/topic/topics-list-manager'
import { fetchTopics } from '~/components/topic/action'

export const revalidate = GLOBAL_CACHE_SETTING

export default async function TagPage() {
  const PAGE_SIZE = 12
  let topicsList: Topic[] = []
  let topicsCount: number = 0

  try {
    const topicsResponse = await fetchTopics({
      page: 0,
      pageSize: PAGE_SIZE,
      isWithCount: true,
    })
    if (!topicsResponse.allTopics) return
    topicsList = topicsResponse?.allTopics ?? []
    topicsCount = topicsResponse?._allTopicsMeta?.count ?? 0
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

  console.log(123)

  return (
    <section className={styles.topic}>
      <div className={styles.topicWrapper}>
        <h1 className={styles.topicName}>推薦專題</h1>
        <TopicsListManager
          pageSize={PAGE_SIZE}
          topicsCount={topicsCount}
          initTopicsList={topicsList}
        />
      </div>
    </section>
  )
}
