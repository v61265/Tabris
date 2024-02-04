import styles from '~/styles/components/topic/ui-topic-card.module.scss'
import { PostImage } from '~/utils'
import ResponsiveImage from '~/components/shared/responsive-image'
import { ApiData } from '~/types/api-data'

type UiPostCardProps = {
  title: string
  href: string
  images: PostImage
  formattedBrief: ApiData[]
}

export default function UiTopicCard({
  title = '',
  href = '',
  images,
  formattedBrief,
}: UiPostCardProps) {
  const shownBrief =
    formattedBrief?.map((item) => item?.content?.[0] || '').join('<br>') ?? ''

  return (
    <a
      className={styles.card}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className={styles.cardTop}>
        <figure className={styles.cardImage}>
          <ResponsiveImage
            images={images}
            alt={title}
            rwd={{ mobile: '500px', tablet: '500px', desktop: '500px' }}
            priority={false}
          />
        </figure>
        <span className={styles.cardTitle}>{title}</span>
      </div>
      {shownBrief && (
        <div className={styles.mask}>
          <p
            className={styles.brief}
            dangerouslySetInnerHTML={{ __html: shownBrief }}
          />
        </div>
      )}
    </a>
  )
}
