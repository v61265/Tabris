import ArticleContentVideo from '~/components/shared/article-content-video'
import YoutubeEmbed from '~/components/shared/youtube-embed'
import { extractYoutubeId } from '~/utils'

type HeroVideoProps = {
  videoSrc: string
  controls?: boolean
}

export default function HeroVideo({
  videoSrc,
  controls = true,
}: HeroVideoProps) {
  // Check if the videoSrc is a YouTube URL
  const isYoutubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  // Handle the videoSrc based on its type
  const handleVideoSrc = (src: string, controls: boolean) => {
    if (isYoutubeUrl(src)) {
      const youtubeId = extractYoutubeId(src)
      if (youtubeId) {
        return (
          <YoutubeEmbed
            youtubeId={youtubeId}
            autoplay={true}
            muted={true}
            loop={true}
            controls={controls}
          />
        )
      }
    }
    return (
      <ArticleContentVideo
        videoSrc={src}
        preload="metadata"
        autoPlay={true}
        loop={true}
        playsInline={true}
        muted={true}
        controls={controls}
      />
    )
  }

  return <section>{handleVideoSrc(videoSrc, controls)}</section>
}
