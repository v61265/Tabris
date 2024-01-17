import styles from '~/styles/components/shared/ui-post-card.module.scss'
import { formateDateAtTaipei, PostImage } from '~/utils'

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

  // 限制 brief 字數
  const limit = 45
  const postDescriptionTruncated =
    description.length <= limit
      ? description
      : description.substring(0, limit).concat('...')

  return (
    <a
      className={styles.card}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className={styles.cardTop}>
        <span className="post-img-wrapper stretch">
          {/* // <LazyRenderer className="post-img--wrapper lazy">
        //   <ResponsiveImageLoader
        //     :alt="postTitle"
        //     :images="postImgURLs"
        //     className="post-img--wrapper"
        //     sizes="(max-width: 767px) 100vw, 400px"
        //     ><template #loading
        //       ><img src="~assets/img/default/loading.svg" /></template
        //   ></ResponsiveImageLoader>
        // </LazyRenderer> */}
          {isVideoNews && (
            <span className="g-video-news-img-icon-wrapper">
              <span className="g-video-news-img-icon" />
            </span>
          )}
        </span>
        <span className={styles.info}>
          <span
            className={styles.infoTitle}
            dangerouslySetInnerHTML={{ __html: postTitleProcessed }}
          />
          <span className={styles.infoDescription}>
            {postDescriptionTruncated}
          </span>
          <span className={styles.infoDate}>
            {formateDateAtTaipei(date, 'YYYY.MM.DD HH:mm', '')}
          </span>
        </span>
      </span>
    </a>
  )
}
