'use client'
import Image from '@readr-media/react-image'
import type { HeroImage, Slideshow } from '~/graphql/query/topic'
import styles from '~/styles/components/topic/single-topic/hero-slideshow.module.scss'
import { formateHeroImage } from '~/utils'

type HeroSlideshowProps = {
  heroImage: HeroImage
  title: string
  slideshow: Slideshow[]
}

export default function HeroSlideshow({
  heroImage,
  title,
  slideshow,
}: HeroSlideshowProps) {
  console.log(heroImage, title, slideshow)

  const formattedHeroImage = formateHeroImage(heroImage)
 

  return (
    <section className={styles.sectionWrapper}>
      <Image
        images={formattedHeroImage}
        alt={title}
        // loadingImage="/images/loading.svg"
        defaultImage="/images/image-default.jpg"
        rwd={{
          mobile: '100vw',
          tablet: '100vw',
          laptop: '100vw',
          desktop: '100vw',
          default: '100vw',
        }}
        priority
      />
    </section>
  )
}
