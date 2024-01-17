import type { FlashNews } from '~/graphql/query/flash-news'
import styles from '~/styles/components/flash-news/ui-mob-flash-news.module.scss'

type UiMobFlashNewsProps = {
  flashNews: FlashNews[]
}

export default function UiMobFlashNews({ flashNews }: UiMobFlashNewsProps) {
  return (
    <div>
      <div className={styles.mobWrapper}>Mob Flash News</div>
    </div>
  )
}
