import type { Video } from '~/graphql/query/videos'
import UiAsideVideosList from '~/components/shared/ui-aside-videos-list'

type AsideVideoListHandlerProps = {
  otherStreamings: Video[]
  liveVideo: Video[]
}

export default function AsideVideoListHandler({
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
    </section>
  )
}
