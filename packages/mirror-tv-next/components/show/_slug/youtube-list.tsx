'use client'
import YoutubeEmbed from '~/components/shared/youtube-embed'
import styles from './_styles/youtube-list.module.scss'
import { useMemo, useState } from 'react'
import useWindowDimensions from '~/hooks/use-window-dimensions'
import UiLoadMoreButton from '~/components/shared/ui-load-more-button'

export type FormatPlayListItems = {
  name?: string
  items: { id: string; title: string }[] | undefined
  nextPageToken: string | undefined
}

type YoutubeListProps = {
  playListObj: FormatPlayListItems
}

export default function YoutubeList({ playListObj }: YoutubeListProps) {
  const [page, setPage] = useState(1)
  const { width } = useWindowDimensions()
  const isMobile = useMemo(() => {
    return width && width < 768
  }, [width])
  const videoPerPage = useMemo(() => {
    return isMobile ? 2 : 6
  }, [isMobile])
  const renderedVideo = useMemo(() => {
    return playListObj?.items?.slice(0, page * videoPerPage)
  }, [videoPerPage, page])

  const handleClickMore = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <section key={playListObj.name} className={styles.list}>
      <span className={styles.sectionName}>{playListObj.name}</span>
      <ol className={styles.listContainer}>
        {renderedVideo?.map((ytItem) => {
          return (
            <li key={ytItem.id} className={styles.item}>
              <YoutubeEmbed
                youtubeId={ytItem.id}
                autoplay={false}
                muted={false}
                loop={true}
                controls={true}
              />
              <span className={styles.itemName}>{ytItem.title}</span>
            </li>
          )
        })}
      </ol>
      {playListObj?.items?.length &&
        playListObj?.items?.length > videoPerPage * page && (
          <UiLoadMoreButton title="看更多" onClick={handleClickMore} />
        )}
    </section>
  )
}
