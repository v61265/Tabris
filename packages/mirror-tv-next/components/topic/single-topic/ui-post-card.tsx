import Image from '@readr-media/react-image'
import Link from 'next/link'
import type { Post } from '~/graphql/query/topic'
import styles from '~/styles/components/topic/single-topic/ui-post-card.module.scss'
import { formateHeroImage } from '~/utils'

type Props = {
  item: Post
}

export default function UiPostCard({ item }: Props) {
  const formattedHeroImage = formateHeroImage(item.heroImage)
  return (
    <Link
      href={`/story/${item.slug}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {item.categories?.[0]?.name && (
            <div className={styles.categoryTag}>{item.categories[0].name}</div>
          )}
          <Image
            images={formattedHeroImage}
            alt={item.title}
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
        <div className={styles.postTitle}>{item.title}</div>
      </div>
    </Link>
  )
}
