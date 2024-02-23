'use client'
import Image from '@readr-media/react-image'
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
  console.log(heroImage, title, slideshow)

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
            <SwiperSlide className={styles.swiperSlide}>
              <div className={styles.slideImageContainer}>
                <Image
                  images={formattedHeroImage}
                  alt={title}
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
                <div className={styles.articleTitle}>一些字一些字</div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
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
