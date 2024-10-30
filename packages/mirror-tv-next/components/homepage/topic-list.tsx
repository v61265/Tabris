import styles from './_styles/topic-list.module.scss'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'

type TopicListProps = {
  title: string
}

export default function TopicList({ title }: TopicListProps) {
  return (
    <div className={styles.wrapper}>
      <UiHeadingBordered title={title} className={styles.listTitle} />
    </div>
  )
}
