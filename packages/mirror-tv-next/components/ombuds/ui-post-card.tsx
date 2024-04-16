import Image from '@readr-media/react-image'
import Link from 'next/link'
import { formateHeroImage } from '~/utils'
import type { Post } from '~/graphql/query/ombuds'
import styles from '~/styles/components/ombuds/ui-post-card.module.scss'
import dayjs from 'dayjs'

type Props = {
  item: Post
}

export default function UiPostCard({ item }: Props) {
  function formatDate(date: string): string {
    return dayjs(date).format('YYYY/MM/DD HH:mm')
  }

  const formattedHeroImage = formateHeroImage(item.heroImage)
  return (
    <Link
      href={`/story/${item.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cardWrapper}
    >
      <div className={styles.imageWrapper}>
        <Image
          images={formattedHeroImage}
          alt={item.name}
          loadingImage="/images/loading.svg"
          defaultImage="/images/image-default.jpg"
          rwd={{
            mobile: '100vw',
            tablet: '100vw',
            laptop: '100vw',
            desktop: '100vw',
            default: '100vw',
          }}
        />
      </div>
      <span className={styles.infoWrapper}>
        <span className={styles.title}>{item.name}</span>
        <span className={styles.date}>{formatDate(item.publishTime)}</span>
      </span>
    </Link>
  )
}
