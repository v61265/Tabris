'use client'
import Image from '@readr-media/react-image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { HeroImage, Slideshow } from '~/graphql/query/topic'
import styles from '~/styles/components/topic/single-topic/hero-slideshow.module.scss'
import '~/styles/components/topic/single-topic/swiper-custom-styles.scss'
import { formateHeroImage } from '~/utils'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper/modules'

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
  const formattedHeroImage = formateHeroImage(heroImage)

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.imageContainer}>
        <div className={styles.swiperContainer}>
          <Swiper
            cssMode={true}
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
            className={styles.swiper}
          >
            {slideshow.map((slide, index) => {
              const formattedSlideImage = formateHeroImage(slide.heroImage)

              return (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <div className={styles.slideImageContainer}>
                    <Link
                      href={`/story/${slide.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        images={formattedSlideImage}
                        alt={slide.name}
                        loadingImage="/images/loading.svg"
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
                      <div className={styles.articleTitle}>{slide.name}</div>
                    </Link>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <Image
          images={formattedHeroImage}
          alt={title}
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
      </div>
    </section>
  )
}
