import styles from '~/styles/components/category/video/ui-show-card.module.scss'
import ResponsiveImage from '~/components/shared/responsive-image'
import { formateHeroImage } from '~/utils'
import type { HeroImage } from '~/types/common'

type UiShowCardProps = {
  slug: string
  bannerImg: HeroImage
  isArtShow: boolean
  name: string
}

export default function UiShowCard({
  slug,
  bannerImg,
  isArtShow = false,
  name,
}: UiShowCardProps) {
  const href = isArtShow ? `/show/${slug}/main` : ``
  return (
    <a
      className={styles.image}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ResponsiveImage
        images={formateHeroImage(bannerImg)}
        alt={name}
        rwd={{ mobile: '500px', tablet: '500px', desktop: '500px' }}
        priority={false}
      />
    </a>
  )
}
