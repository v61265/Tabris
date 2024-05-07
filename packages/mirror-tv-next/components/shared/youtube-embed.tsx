'use client'
import styles from '~/styles/components/shared/youtube-embed.module.scss'

type YoutubeEmbedProps = {
  youtubeId: string | null
  muted?: boolean
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  className?: string
  handleEnded?: () => void
  handlePlaying?: () => void
}

export default function YoutubeEmbed({
  youtubeId,
  muted = false,
  autoplay = false,
  loop = false,
  controls = true,
  className = '',
  handleEnded = () => {},
  handlePlaying = () => {},
}: YoutubeEmbedProps) {
  return (
    <div className={`${styles.videoWrapper} ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${
          autoplay ? 1 : 0
        }&controls=${controls ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${
          loop ? 1 : 0
        }`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        onEnded={handleEnded}
        onPlaying={handlePlaying}
      />
    </div>
  )
}
