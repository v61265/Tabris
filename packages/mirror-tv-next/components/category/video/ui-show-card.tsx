import styles from './_styles/ui-show-card.module.scss'
import ResponsiveImage from '~/components/shared/responsive-image'
import { formateHeroImage } from '~/utils'
import type { HeroImage } from '~/types/common'
import Link from 'next/link'

type UiShowCardProps = {
  slug: string
  bannerImg: HeroImage
  name: string
}

export default function UiShowCard({ slug, bannerImg, name }: UiShowCardProps) {
  return (
    <Link
      className={styles.image}
      href={`/show/${slug}/`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ResponsiveImage
        images={formateHeroImage(bannerImg)}
        alt={name}
        rwd={{ mobile: '500px', tablet: '500px', desktop: '500px' }}
        priority={false}
      />
    </Link>
  )
}
