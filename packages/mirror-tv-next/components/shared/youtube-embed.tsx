import styles from '~/styles/components/shared/youtube-embed.module.scss'

type YoutubeEmbedProps = {
  youtubeId: string
}

export default function YoutubeEmbed({ youtubeId }: YoutubeEmbedProps) {
  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&mute=1&loop=1&modestbranding=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
}
