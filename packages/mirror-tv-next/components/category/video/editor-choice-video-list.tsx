'use client'
import styles from '~/styles/components/category/video/editor-choices.module.scss'
import type { VideoEditorChoice } from '~/graphql/query/video-editor-choice'
import { extractYoutubeId } from '~/utils'
import YoutubeEmbed from '~/components/shared/youtube-embed'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import { useEffect, useState } from 'react'
import ResponsiveImage from '~/components/shared/responsive-image'
import { formateHeroImage } from '~/utils'

type EditorChoiceVideoListProps = {
  title: string
  videoLists: VideoEditorChoice[]
}

export default function EditorChoiceVideoList({
  title,
  videoLists = [],
}: EditorChoiceVideoListProps) {
  const [highlightIndex, setHighLightIndex] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [videoIsPlaying, setVideoIsPlaying] = useState(false)
  const selectItemToHighlight = (index: number) => {
    setHighLightIndex(index)
  }
  const getImageUrls = (item: VideoEditorChoice['videoEditor']) => {
    return formateHeroImage(item.heroVideo?.coverPhoto ?? item.heroImage)
  }

  const nextVideoCarousel = () => {
    if (videoIsPlaying) return
    if (highlightIndex + 1 > videoLists.length - 1) {
      setHighLightIndex(0)
    } else {
      setHighLightIndex((prev) => prev + 1)
    }
  }

  const setTimerInterval = () => {
    clearInterval(timer!)
    setTimer(setInterval(nextVideoCarousel, 5000))
  }

  const handleEnded = () => {
    clearInterval(timer!)
    setTimerInterval()
  }

  const handlePlaying = () => {
    console.log('playing')
    clearInterval(timer!)
    setTimer(null)
    setVideoIsPlaying(true)
  }

  useEffect(() => {
    setTimerInterval()
    return () => clearInterval(timer!)
  }, [highlightIndex])

  return (
    <div className={styles.wrapper}>
      <UiHeadingBordered title={title} />
      <div className={styles.container}>
        <YoutubeEmbed
          youtubeId={extractYoutubeId(
            videoLists[highlightIndex]?.videoEditor?.heroVideo?.url
          )}
          className={styles.feature}
          handleEnded={handleEnded}
          handlePlaying={handlePlaying}
        />
        <div className={styles.list}>
          <div className={styles.scroll}>
            {videoLists.map(({ videoEditor }, index) => {
              return (
                <div
                  key={videoEditor.slug}
                  className={`${styles.item} ${
                    index === highlightIndex ? styles.highlight : ''
                  }`}
                  onClick={() => selectItemToHighlight(index)}
                >
                  <picture>
                    <ResponsiveImage
                      images={getImageUrls(videoEditor)}
                      alt={videoEditor.name}
                      rwd={{
                        mobile: '500px',
                        tablet: '500px',
                        desktop: '500px',
                      }}
                      priority={false}
                    />
                    <div className="g-video-news-img-icon-wrapper">
                      <div className="g-video-news-img-icon" />
                    </div>
                  </picture>
                  <span>{videoEditor.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
