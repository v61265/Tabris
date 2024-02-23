'use client'
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
  console.log({ formattedHeroImage })

  return <section className={styles.sectionWrapper}>Slideshow</section>
}
