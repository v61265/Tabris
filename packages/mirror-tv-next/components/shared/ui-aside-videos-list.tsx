import styles from './_styles/ui-aside-video-list.module.scss'
import UiHeadingBordered from './ui-heading-bordered'
import YoutubeEmbed from './youtube-embed'
import { extractYoutubeId } from '~/utils'

type UiAsideVideosListProps = {
  title: string
  videosList: { id: string; src: string }[]
  isAutoPlay: boolean
}

export default function UiAsideVideosList({
  title,
  videosList = [],
  isAutoPlay = false,
}: UiAsideVideosListProps) {
  return (
    <>
      <div className={styles.titleWrapper}>
        <UiHeadingBordered title={title} />
        {isAutoPlay && <div className={styles.live} />}
      </div>
      <ul className={styles.list}>
        {videosList.map((video) => {
          const youtubeId = extractYoutubeId(video.src)
          return (
            <YoutubeEmbed
              key={video.id}
              youtubeId={youtubeId}
              autoplay={isAutoPlay}
              muted={true}
              loop={true}
              controls={true}
            />
          )
        })}
      </ul>
    </>
  )
}
