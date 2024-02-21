import styles from '~/styles/components/category/ui-feature-post.module.scss'
import { FormatePostCard } from '~/types/common'
import { formateDateAtTaipei } from '~/utils/date-handler'
import ResponsiveImage from '~/components/shared/responsive-image'

type UiFeaturePostProps = {
  post: FormatePostCard
}

export default function UiFeaturePost({ post }: UiFeaturePostProps) {
  const { href, articleImgURLs, articleTitle, articleStyle, articleDate } = post
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.featureCard}
    >
      <span className={styles.imageWrapper}>
        <ResponsiveImage
          images={articleImgURLs}
          alt={articleTitle}
          rwd={{ mobile: '500px', tablet: '500px', desktop: '500px' }}
          priority={false}
        />
        {articleStyle === 'videoNews' && (
          <span className={styles.videoIcon}></span>
        )}
      </span>
      <span className={styles.info}>
        <span className={styles.title}>{articleTitle}</span>
        <span className={styles.date}>
          {formateDateAtTaipei(articleDate, 'YYYY/MM/DD HH:mm', '')}
        </span>
      </span>
    </a>
  )
}
