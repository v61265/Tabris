import Image from '@readr-media/react-image'
import Link from 'next/link'
import { formateHeroImage } from '~/utils'
import type { Post } from '~/graphql/query/ombuds'
import styles from '~/styles/components/ombuds/ui-post-card.module.scss'

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
      <div className={styles.infoWrapper}>
        <div>{item.name}</div>
        <div>{item.publishTime}</div>
      </div>
    </Link>
  )
}
