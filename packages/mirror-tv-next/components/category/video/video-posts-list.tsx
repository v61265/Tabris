'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const POSTS_LIST_LENGTH_MAX = 24
  const [page, setPage] = useState(1)
  const [postsList, setPostsList] = useState<FormattedPostCard[]>([
    ...initPostsList,
  ])
  const [slidesPerView, setSlidesPerView] = useState(2)
  const placeholder = useMemo<number[]>(() => {
    const placeholderCount = 3 - (postsList.length % 3)
    return Array(placeholderCount).fill(null)
  }, [postsList])

  const sliderRef = useRef<SwiperRef>(null)
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper?.slidePrev()
    setPage((page) => page - 1)
  }, [])

  const handleLoadMore = async () => {
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
    setPage((page) => page + 1)
  }, [])

  useEffect(() => {
    if (
      (page + 2) * slidesPerView > postsList.length &&
      (page + 2) * slidesPerView < postsCount &&
      (page + 2) * slidesPerView < POSTS_LIST_LENGTH_MAX
    ) {
      handleLoadMore()
    }
  }, [page])

  const [gapPx, setGapPx] = useState(16)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const tabletWidthThreshold = 768
      const desktopWidthThreshold = 1200
      if (width >= tabletWidthThreshold) {
        setGapPx(20)
        setSlidesPerView(3)
      } else if (width >= desktopWidthThreshold) {
        setGapPx(24)
      }
    }
    // Add event listener for resize to detect changes in viewport width
    window.addEventListener('resize', handleResize)
    // Call handleResize once initially to set the correct value on component mount
    handleResize()
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
          slidesPerView={slidesPerView}
          spaceBetween={gapPx}
          slidesPerGroup={slidesPerView}
          loop={false}
          mousewheel={true}
          keyboard={true}
          modules={[Mousewheel, Keyboard, Navigation]}
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
          {placeholder.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={styles.swiperSlide}
              ></SwiperSlide>
            )
          })}
        </Swiper>
        {page !== 1 && (
          <div className={styles.prevArrow} onClick={handlePrev}></div>
        )}
        {page * slidesPerView !==
          Math.min(postsCount + placeholder.length, POSTS_LIST_LENGTH_MAX) && (
          <div className={styles.nextArrow} onClick={handleNext}></div>
        )}
      </ol>
    </div>
  )
}
