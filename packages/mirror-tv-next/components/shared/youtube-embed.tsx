'use client'
import styles from '~/styles/components/shared/youtube-embed.module.scss'
import YouTube, { YouTubeProps } from 'react-youtube'

type YoutubeEmbedProps = {
  youtubeId: string
  muted?: boolean
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  className?: string
  handleEnded?: YouTubeProps['onEnd']
  handlePlaying?: YouTubeProps['onPlay']
}

export default function YoutubeEmbed({
  youtubeId = '',
  muted = false,
  autoplay = false,
  loop = false,
  controls = true,
  className = '',
  handleEnded,
  handlePlaying,
}: YoutubeEmbedProps) {
  const opts: YouTubeProps['opts'] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: autoplay ? 1 : 0,
      controls: controls ? 1 : 0,
      mute: muted ? 1 : 0,
      loop: loop ? 1 : 0,
    },
  }
  return (
    <div className={`${styles.videoWrapper} ${className}`}>
      <YouTube
        videoId={youtubeId} // defaults -> ''
        id={youtubeId} // defaults -> ''
        title="Embedded youtube"
        opts={opts} // defaults -> {}
        onPlay={handlePlaying} // defaults -> noop
        onEnd={handleEnded} // defaults -> noop
      />
    </div>
  )
}
