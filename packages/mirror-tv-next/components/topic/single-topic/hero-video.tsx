import ArticleContentVideo from '~/components/shared/article-content-video'
import YoutubeEmbed from '~/components/shared/youtube-embed'

type HeroVideoProps = {
  videoSrc: string
}

export default function HeroVideo({ videoSrc }: HeroVideoProps) {
  // Extract YouTube video ID from URL
  const extractYoutubeId = (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    return match ? match[1] : null
  }

  // Check if the videoSrc is a YouTube URL
  const isYoutubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  // Handle the videoSrc based on its type
  const handleVideoSrc = (src: string) => {
    if (isYoutubeUrl(src)) {
      const youtubeId = extractYoutubeId(src)
      if (youtubeId) {
        return <YoutubeEmbed youtubeId={youtubeId} />
      }
    }
    return <ArticleContentVideo videoSrc={src} />
  }

  return <section>{handleVideoSrc(videoSrc)}</section>
}
