import styles from '~/styles/components/category/ui-feature-post.module.scss'
import { formateDateAtTaipei } from '~/utils/date-handler'
import ResponsiveImage from '~/components/shared/responsive-image'
import { FormattedPostCard } from '~/utils'

type UiFeaturePostProps = {
  post: FormattedPostCard
}

export default function UiFeaturePost({ post }: UiFeaturePostProps) {
  const { href, style, name, images, publishTime } = post
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.featureCard}
    >
      <span className={[styles.imageWrapper, 'article-img-wrapper'].join(' ')}>
        <ResponsiveImage
          images={images}
          alt={name}
          rwd={{ mobile: '500px', tablet: '500px', desktop: '500px' }}
          priority={false}
          imgClassName="article-img"
        />
        {style === 'videoNews' && <span className={styles.videoIcon}></span>}
      </span>
      <span className={styles.info}>
        <span className={styles.title}>{name}</span>
        <span className={styles.date}>
          {formateDateAtTaipei(publishTime, 'YYYY/MM/DD HH:mm', '')}
        </span>
      </span>
    </a>
  )
}
