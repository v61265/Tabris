'use client'
import type { Video } from '~/graphql/query/videos'
import type { PromotionVideo } from '~/graphql/query/promotion-video'
import UiAsideVideosList from '~/components/shared/ui-aside-videos-list'
import useWindowDimensions from '~/hooks/use-window-dimensions'
import { useMemo } from 'react'

type AsideVideoListHandlerProps = {
  isMobile: boolean
  isDesktop: boolean
  promotionVideos: PromotionVideo[]
  otherStreamings: Video[]
  liveVideo: Video[]
}

export default function AsideVideoListHandler({
  isMobile,
  isDesktop,
  promotionVideos,
  otherStreamings,
  liveVideo,
}: AsideVideoListHandlerProps) {
  const { width = 1200 } = useWindowDimensions()
  const isDesktopWidth = useMemo(() => width >= 1200, [width])
  const notShown = useMemo(
    () => (isDesktopWidth && !isDesktop) || (!isDesktopWidth && !isMobile),
    [isDesktop]
  )
  if (notShown) return <></>
  return (
    <section>
      {!!liveVideo.length && (
        <UiAsideVideosList
          title="鏡新聞LIVE"
          videosList={liveVideo.map((video) => {
            return { ...video, src: video.youtubeUrl ?? video.url }
          })}
          isAutoPlay={!notShown}
        />
      )}
      {!!otherStreamings.length && (
        <UiAsideVideosList
          title="直播現場"
          videosList={otherStreamings.map((video) => {
            return { ...video, src: video.youtubeUrl ?? video.url }
          })}
          isAutoPlay={!notShown}
        />
      )}
      {!!promotionVideos.length && (
        <UiAsideVideosList
          title="發燒單元"
          videosList={promotionVideos.map((video) => {
            return { ...video, src: video.ytUrl }
          })}
          isAutoPlay={false}
        />
      )}
    </section>
  )
}
