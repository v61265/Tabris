import type { FlashNews } from '~/graphql/query/flash-news'
import styles from '~/styles/components/flash-news/ui-pc-flash-news.module.scss'

type UiPcFlashNewsProps = {
  flashNews: FlashNews[]
}

export default function UiPcFlashNews({ flashNews }: UiPcFlashNewsProps) {
  return (
    <div>
      <div className={styles.pcWrapper}>Pc Flash News</div>
    </div>
  )
}
