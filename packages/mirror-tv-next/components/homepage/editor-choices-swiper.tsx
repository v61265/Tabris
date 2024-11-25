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
import { PaginationOptions } from 'swiper/types'

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

  const pagination: PaginationOptions = {
    el: '.swiper-pagination',
    type: 'custom',
    renderCustom(swiper, current: number, total: number) {
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
            onBeforeInit={(swiper) => {
              // @ts-expect-error - Swiper types don't properly recognize navigation params assignment
              swiper.params.navigation.prevEl = prevButtonRef.current
              // @ts-expect-error - Swiper types don't properly recognize navigation params assignment
              swiper.params.navigation.nextEl = nextButtonRef.current
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
                  <a
                    className={styles.imageContainer}
                    href={`/story/${choice.slug}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Image
                      loadingImage="/images/loading.svg"
                      defaultImage="/images/image-default.jpg"
                      images={formateHeroImage(
                        choice.heroImage ?? choice.heroVideo.coverPhoto ?? {}
                      )}
                      alt={choice.name}
                      rwd={{
                        tablet: '100px',
                        desktop: '1000px',
                      }}
                      priority={false}
                    />
                  </a>
                  <a
                    className={styles.nameWrapper}
                    href={`/story/${choice.slug}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className={styles.name}>{choice.name}</span>
                  </a>
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
            className={`${styles.nav} ${styles.next} `}
            ref={nextButtonRef}
          >
            <span />
          </button>
          <div className={`swiper-pagination ${styles.pagination} nav-next`} />
        </div>
      </div>
    </section>
  )
}
