import type { FlashNews } from '~/graphql/query/flash-news'
import styles from '~/styles/components/flash-news/ui-mob-flash-news.module.scss'
import NewsCarousel from './news-carousel'

type UiMobFlashNewsProps = {
  flashNews: FlashNews[]
}

export default function UiMobFlashNews({ flashNews }: UiMobFlashNewsProps) {
  return (
    <div className={styles.flashNews}>
      <p className={styles.tag}>快訊</p>

      <NewsCarousel flashNews={flashNews} />
    </div>
  )
}
