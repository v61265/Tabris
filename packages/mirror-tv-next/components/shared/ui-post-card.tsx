import styles from '~/styles/components/flash-news/ui-mob-flash-news.module.scss'

type UiPostCardProps = {
  title: string
  date: string
  href: string
  images: {
    urlOriginal: string
    urlDesktopSized?: string
    urlTabletSized?: string
    urlMobileSized?: string
    urlTinySized?: string
  }

  // Differentiate two usages in / and /category/:name pages
  mobileLayoutDirection: 'row' | 'column'
}

export default function UiPostCard({
  title = '',
  date = '',
  href = '',
  images,
  mobileLayoutDirection = 'column',
}: UiPostCardProps) {
  return (
    <div>
      <div className={styles.mobWrapper}>Mob Flash News</div>
    </div>
  )
}
