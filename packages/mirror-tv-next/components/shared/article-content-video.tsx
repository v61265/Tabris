import styles from './_styles/article-content-video.module.scss'

type ArticleContentVideoProps = {
  videoSrc: string
  preload?: 'auto' | 'metadata' | 'none'
  autoPlay?: boolean
  loop?: boolean
  playsInline?: boolean
  muted?: boolean
  controls?: boolean
}

export default function ArticleContentVideo({
  videoSrc,
  preload = 'metadata',
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = true,
  controls = true,
}: ArticleContentVideoProps) {
  return (
    <div className={styles.videoWrapper}>
      <video
        preload={preload}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        muted={muted}
        controls={controls}
      >
        <source src={videoSrc} />
      </video>
    </div>
  )
}
