import styles from './_styles/ui-post-card-homepage.module.scss'
import { formateDateAtTaipei, PostImage } from '~/utils'
import ResponsiveImage from './responsive-image'

export type UiPostCardProps = {
  title: string
  date: Date
  href: string
  postStyle: string | undefined
  images: PostImage
  label?: string
  postTitleHighlightText?: string
}

export default function UiPostCardHomepage({
  title = '',
  date,
  href = '',
  images,
  postStyle = 'article',
  label = '',
}: UiPostCardProps) {
  const isVideoNews = postStyle === 'videoNews'

  return (
    <a
      className={[styles.card, 'article-card'].join(' ')}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {!!label && (
        <span
          className={`${styles.label} ${
            label === '特企' ? styles.yellowBack : ''
          }}`}
        >
          {label}
        </span>
      )}
      <span className={styles.cardWrapper}>
        <figure className={styles.cardImage}>
          <ResponsiveImage
            images={images}
            alt={title}
            rwd={{ mobile: '500px', tablet: '500px', desktop: '500px' }}
            priority={false}
          />
          {isVideoNews && <span className={styles.videoIcon}></span>}
        </figure>
        <div className={styles.info}>
          <span className={styles.infoDate}>
            {formateDateAtTaipei(date, 'YYYY.MM.DD HH:mm', '')}
          </span>
          <span
            className={styles.infoTitle}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </span>
    </a>
  )
}
