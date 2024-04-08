'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '~/styles/components/category/video/video-posts-list.module.scss'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import { fetchVideoPostsItems } from '~/components/category/video/action'
import { formatArticleCard, FormattedPostCard } from '~/utils'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules'
import VideoPostsCard from './video-post-card'

type VideoPostsListProps = {
  categorySlug: string
  categoryName: string
  pageSize: number
  postsCount: number
  initPostsList: FormattedPostCard[]
}

export default function VideoPostsList({
  categorySlug,
  categoryName,
  pageSize,
  postsCount,
  initPostsList,
}: VideoPostsListProps) {
  const [activeIndex, setActiveIndex] = useState(3)
  const [postsList, setPostsList] = useState<FormattedPostCard[]>([
    ...initPostsList,
  ])
  const [swiperStatus, setSwiperStatus] = useState<'start' | 'middle' | 'end'>(
    'start'
  )

  const sliderRef = useRef<SwiperRef>(null)
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper?.slidePrev()
  }, [])

  const handleLoadMore = async () => {
    console.log('load more')
    const {
      data: { allPosts: newPosts },
    } = await fetchVideoPostsItems({
      page: 1,
      categorySlug: categorySlug,
      isWithCount: false,
      pageSize,
    })
    if (!newPosts) return
    setPostsList((oldPost) => [...oldPost, ...newPosts.map(formatArticleCard)])
  }

  const handleNext = useCallback(async () => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper?.slideNext()
  }, [])

  useEffect(() => {
    if (activeIndex + 6 > postsList.length && activeIndex + 1 < postsCount) {
      handleLoadMore()
    }
  }, [activeIndex])

  return (
    <div className={styles.list}>
      <a
        href={categorySlug ? `/category/${categorySlug}` : ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <UiHeadingBordered
          title={categoryName}
          className={styles.categoryTitle}
        />
        {!!categorySlug && <span className={styles.categoryLink} />}
      </a>

      <ol className={styles.postsList}>
        <Swiper
          ref={sliderRef}
          cssMode={true}
          slidesPerView={2}
          spaceBetween={16}
          slidesPerGroup={2}
          loop={false}
          mousewheel={true}
          slidesOffsetAfter={0}
          loopAddBlankSlides={true}
          keyboard={true}
          modules={[Mousewheel, Keyboard, Navigation]}
          onSlideChange={(swiperCore) => {
            const { activeIndex } = swiperCore
            setSwiperStatus('middle')
            setActiveIndex(activeIndex)
          }}
          onReachBeginning={() => setSwiperStatus('start')}
          onReachEnd={() => setSwiperStatus('end')}
          breakpoints={{
            768: {
              slidesPerGroup: 3,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerGroup: 3,
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {postsList.map((post, index) => {
            return (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <VideoPostsCard
                  title={post.name}
                  imageUrls={post.images}
                  href={post.href}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        {swiperStatus !== 'start' && (
          <div className={styles.prevArrow} onClick={handlePrev}></div>
        )}
        {swiperStatus !== 'end' && (
          <div className={styles.nextArrow} onClick={handleNext}></div>
        )}
      </ol>
    </div>
  )
}
