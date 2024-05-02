import type { Video } from '~/graphql/query/videos'
import type { PromotionVideo } from '~/graphql/query/promotion-video'
import UiAsideVideosList from '~/components/shared/ui-aside-videos-list'

type AsideVideoListHandlerProps = {
  promotionVideos: PromotionVideo[]
  otherStreamings: Video[]
  liveVideo: Video[]
}

export default function AsideVideoListHandler({
  promotionVideos,
  otherStreamings,
  liveVideo,
}: AsideVideoListHandlerProps) {
  return (
    <section>
      {!!liveVideo.length && (
        <UiAsideVideosList
          title="鏡新聞LIVE"
          videosList={liveVideo.map((video) => {
            return { ...video, src: video.youtubeUrl ?? video.url }
          })}
          isAutoPlay={true}
        />
      )}
      {!!otherStreamings.length && (
        <UiAsideVideosList
          title="直播現場"
          videosList={otherStreamings.map((video) => {
            return { ...video, src: video.youtubeUrl ?? video.url }
          })}
          isAutoPlay={true}
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
