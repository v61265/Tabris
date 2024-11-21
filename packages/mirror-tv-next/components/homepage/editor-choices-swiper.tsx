'use client'
import styles from './_styles/editor-choices-swiper.module.scss'
import { EditorChoices } from '~/graphql/query/editor-choices'
import { Swiper, SwiperSlide } from 'swiper/react'

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
import Image from '@readr-media/react-image'
import { formateHeroImage } from '~/utils'
import { useRef } from 'react'

type EditorChoicesSwiperProps = {
  editorChoices: EditorChoices[]
}

export default function EditorChoicesSwiper({
  editorChoices = [],
}: EditorChoicesSwiperProps) {
  const nextButtonRef = useRef<HTMLButtonElement | null>(null)
  const prevButtonRef = useRef<HTMLButtonElement | null>(null)
  if (!editorChoices?.[0]) {
    return null
  }

  const pagination = {
    el: '.swiper-pagination',
    type: 'custom',
    renderCustom(swiper: typeof Swiper, current: number, total: number) {
      return `
        <span class="swiper-pagination-current">${current}</span>
        |
        <span class="swiper-pagination-total">${total}</span>
      `
    },
  }

  return (
    <section className={styles.container}>
      <div>
        <div className={styles.swiperContainer}>
          <Swiper
            cssMode={true}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={pagination}
            onSwiper={(swiper) => {
              if (prevButtonRef.current && nextButtonRef.current) {
                swiper.navigation.init()
                swiper.navigation.update()
              }
            }}
            navigation={{
              nextEl: nextButtonRef.current,
              prevEl: prevButtonRef.current,
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Autoplay, Pagination, Navigation, Mousewheel, Keyboard]}
            className={styles.swiper}
          >
            {editorChoices.map((item) => {
              const { choice } = item
              return (
                <SwiperSlide key={choice.slug} className={styles.swiperSlide}>
                  <div className={styles.imageContainer}>
                    <Image
                      loadingImage="/images/loading.svg"
                      defaultImage="/images/image-default.jpg"
                      images={formateHeroImage(
                        choice.heroImage ?? choice.heroVideo.heroImage ?? {}
                      )}
                      alt={choice.name}
                      rwd={{
                        tablet: '1300px',
                        desktop: '1300px',
                      }}
                      priority={false}
                    />
                  </div>
                  <span className={styles.nameWrapper}>
                    <span className={styles.name}>{choice.name}</span>
                  </span>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <button
            className={`${styles.nav} ${styles.prev}`}
            ref={prevButtonRef}
          >
            <span />
          </button>
          <button
            className={`${styles.nav} ${styles.next}`}
            ref={nextButtonRef}
          >
            <span />
          </button>
          <div className={`swiper-pagination ${styles.pagination}`} />
        </div>
      </div>
    </section>
  )
}
