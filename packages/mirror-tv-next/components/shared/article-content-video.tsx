import styles from '~/styles/components/shared/article-content-video.module.scss'

type ArticleContentVideoProps = {
  videoSrc: string
}

export default function ArticleContentVideo({
  videoSrc,
}: ArticleContentVideoProps) {
  return (
    <div className={styles.videoWrapper}>
      <video preload="metadata" autoPlay loop playsInline muted>
        <source src={videoSrc} />
      </video>
    </div>
  )
}
