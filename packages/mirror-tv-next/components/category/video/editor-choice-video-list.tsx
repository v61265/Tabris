'use client'
import styles from '~/styles/components/category/video/editor-choices.module.scss'
import type { VideoEditorChoice } from '~/graphql/query/video-editor-choice'
import { extractYoutubeId } from '~/utils'
import YoutubeEmbed from '~/components/shared/youtube-embed'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import { useCallback, useEffect, useState } from 'react'
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
  const [status, setStatus] = useState<null | 'playing'>(null)
  const selectItemToHighlight = (index: number) => {
    setHighLightIndex(index)
  }
  const getImageUrls = (item: VideoEditorChoice['videoEditor']) => {
    return formateHeroImage(item.heroVideo?.coverPhoto ?? item.heroImage)
  }

  const nextVideoCarousel = () => {
    setHighLightIndex((prev) => (prev + 1) % videoLists.length)
  }

  const handleEnded = useCallback(() => {
    setStatus(null)
  }, [])

  const handlePlaying = useCallback(() => {
    setStatus('playing')
  }, [])

  useEffect(() => {
    const timer = setInterval(nextVideoCarousel, 5000)
    if (status === 'playing') {
      clearInterval(timer!)
    }
    return () => clearInterval(timer!)
  }, [status])

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
