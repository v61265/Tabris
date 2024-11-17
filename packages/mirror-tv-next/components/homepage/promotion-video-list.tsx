import styles from './_styles/live-cam-list.module.scss'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import YoutubeEmbed from '../shared/youtube-embed'
import { extractYoutubeId } from '~/utils'
import { PromotionVideo } from '~/graphql/query/promotion-video'
import { fetchPromotionVideosServerAction } from '~/app/_actions/share/promotion-videos'

type PromotionVideoListProps = {
  title: string
}

export default async function PromotionVideoList({
  title,
}: PromotionVideoListProps) {
  let allPromotionVideos: PromotionVideo[] = []

  try {
    const response = await fetchPromotionVideosServerAction({
      take: 5,
      pageName: 'homepage',
    })
    allPromotionVideos = response?.data?.allPromotionVideos
  } catch (error) {
    return null
  }

  if (!allPromotionVideos?.[0]) {
    return null
  }

  return (
    <section className={styles.container}>
      <UiHeadingBordered title={title} className={styles.listTitle} />
      <div>
        <div className={styles.list}>
          {allPromotionVideos.map((video) => {
            const youtubeId = extractYoutubeId(video.ytUrl)
            return (
              <YoutubeEmbed
                className={styles.item}
                key={video.id}
                youtubeId={youtubeId}
                autoplay={false}
                muted={false}
                loop={true}
                controls={true}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
