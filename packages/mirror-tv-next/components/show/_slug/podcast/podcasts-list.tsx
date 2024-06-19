'use client'
import styles from './_styles/podcasts-list.module.scss'
import { Podcast } from '~/types/common'
import UiLoadMoreButton from '~/components/shared/ui-load-more-button'
import { useMemo, useState } from 'react'
import useWindowDimensions from '~/hooks/use-window-dimensions'
import UiPodcastItem from './ui-podcast-item'
import AudioPlayer from './audio-player'

export default function PodcastsList({ podcasts }: { podcasts: Podcast[] }) {
  const [page, setPage] = useState<number>(1)
  const { width } = useWindowDimensions()
  const podcastShown = useMemo(() => {
    const shownCount = width && width >= 768 ? 10 * page : 5 * page
    return podcasts.slice(0, shownCount)
  }, [width])

  const [playingIndex, setPlayIndex] = useState<number>(-1)
  const togglePlayingAudio = (index: number) => {
    if (playingIndex !== index) setPlayIndex(index)
  }

  return (
    <section className={`GTM-podcast ${styles.podcast}`}>
      <h3 className={styles.title}>podcast</h3>
      <ul className={`GTM-podcasts-list ${styles.list}`}>
        {podcastShown.map((item, index) => {
          return (
            <UiPodcastItem
              key={index}
              item={item}
              isPlaying={playingIndex === index}
              handleOnClick={() => togglePlayingAudio(index)}
            />
          )
        })}
      </ul>
      <UiLoadMoreButton
        title="看更多"
        onClick={() => setPage((prev) => prev++)}
      />
      {playingIndex !== -1 && (
        <AudioPlayer listeningPodcast={podcasts[playingIndex]} />
      )}
    </section>
  )
}
