import styles from '~/styles/components/shared/ui-post-card.module.scss'
import { formateDateAtTaipei, PostImage } from '~/utils'
import ResponsiveImage from './responsive-image'

type UiPostCardProps = {
  title: string
  date: Date
  href: string
  postStyle: string
  images: PostImage

  // Differentiate two usages in / and /category/:name pages
  mobileLayoutDirection: 'row' | 'column'
  postTitleHighlightText?: string
  description?: string
}

export default function UiPostCard({
  title = '',
  date,
  href = '',
  images,
  postStyle = 'post',
  mobileLayoutDirection = 'column',
  postTitleHighlightText,
  description = '',
}: UiPostCardProps) {
  const isVideoNews = postStyle === 'videoNews'

  // keyword 時有些字體會被 height light
  const highlightTextProducer = (title: string): string | TrustedHTML => {
    const highlightTextProducer = (text: string) => {
      return `<span style="color: #014db8">${text}</span>`
    }
    const re = new RegExp(title.split(' ').join('|'), 'gi')
    return title.replace(re, function (matchedText) {
      return highlightTextProducer(matchedText)
    })
  }
  let postTitleProcessed = postTitleHighlightText
    ? highlightTextProducer(title)
    : title

  if (!mobileLayoutDirection) return <></>

  return (
    <a
      className={styles.card}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className={styles.cardTop}>
        <figure className={styles.cardImage}>
          <ResponsiveImage
            images={images}
            alt={title}
            rwd={{ mobile: '500px', tablet: '500px', desktop: '500px' }}
            priority={false}
          />
          {isVideoNews && (
            <span className="g-video-news-img-icon-wrapper">
              <span className="g-video-news-img-icon" />
            </span>
          )}
        </figure>
        <div className={styles.info}>
          <span
            className={styles.infoTitle}
            dangerouslySetInnerHTML={{ __html: postTitleProcessed }}
          />
          <span className={styles.infoDescription}>{description}</span>
          <span className={styles.infoDate}>
            {formateDateAtTaipei(date, 'YYYY.MM.DD HH:mm', '')}
          </span>
        </div>
      </span>
    </a>
  )
}
