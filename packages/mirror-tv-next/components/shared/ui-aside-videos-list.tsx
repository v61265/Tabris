'use client'
import { useCallback, useRef, useState } from 'react'
import styles from './_styles/ui-aside-video-list.module.scss'
import UiHeadingBordered from './ui-heading-bordered'
import YoutubeEmbed from './youtube-embed'
import { extractYoutubeId } from '~/utils'

type UiAsideVideosListProps = {
  title: string
  videosList: { id: string; src: string }[]
  isAutoPlay: boolean
  firstPlayTriggerClassName?: string
}

export default function UiAsideVideosList({
  title,
  videosList = [],
  isAutoPlay = false,
  firstPlayTriggerClassName,
}: UiAsideVideosListProps) {
  const triggeredDiv = useRef<HTMLDivElement>(null)
  const [playTime, setPlayTime] = useState(0)
  const handlePlaying = useCallback(() => {
    if (!firstPlayTriggerClassName || playTime) return
    setPlayTime((prev) => prev + 1)
    if (triggeredDiv.current) {
      triggeredDiv.current.click()
    }
  }, [playTime])
  return (
    <>
      <div
        className={`${firstPlayTriggerClassName} ${styles.hide}`}
        ref={triggeredDiv}
      />
      <div className={styles.titleWrapper}>
        <UiHeadingBordered title={title} />
        {isAutoPlay && <div className={styles.live} />}
      </div>
      <div className={`${styles.list}`}>
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
              handlePlaying={handlePlaying}
            />
          )
        })}
      </div>
    </>
  )
}
