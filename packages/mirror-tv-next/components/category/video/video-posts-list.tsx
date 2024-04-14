'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
import styles from '~/styles/components/category/video/video-posts-list.module.scss'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import { fetchVideoPostsItems } from '~/components/category/video/action'
import { formatArticleCard, FormattedPostCard } from '~/utils'
import useWindowDimensions from '~/hooks/use-window-dimensions'

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
  const [postsList, setPostsList] = useState<FormattedPostCard[]>([
    ...initPostsList,
  ])
  const [swiperStatus, setSwiperStatus] = useState<'start' | 'middle' | 'end'>(
    'start'
  )

  const { width: viewportWidth = 0 } = useWindowDimensions()
  const slidesPerView = useMemo(() => {
    return viewportWidth >= 768 ? 3 : 2
  }, [viewportWidth])
  const placeholders = useMemo(() => {
    const placeholdersCount = slidesPerView - (postsCount % slidesPerView)
    return Array(placeholdersCount).fill('_')
  }, [slidesPerView, postsCount])

  // about load more and fetch
  const [isFetching, setIsFetching] = useState(false)
  const [fetchedTime, setFetchedTime] = useState(0)
  const handleLoadMore = async () => {
    if (isFetching) return
    setIsFetching(true)
    const {
      data: { allPosts: newPosts },
    } = await fetchVideoPostsItems({
      // fetch next page
      page: fetchedTime + 1,
      categorySlug: categorySlug,
      isWithCount: false,
      pageSize,
    })
    if (!newPosts) return
    setFetchedTime((prev) => prev + 1)
    setPostsList((oldPost) => [...oldPost, ...newPosts.map(formatArticleCard)])
    setIsFetching(false)
  }

  const sliderRef = useRef<SwiperRef>(null)
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper?.slidePrev()
  }, [])
  const handleNext = useCallback(async () => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper?.slideNext()
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
            if (
              !(activeIndex % slidesPerView) &&
              activeIndex + (slidesPerView + 1) >= postsList.length &&
              postsList.length < postsCount
            ) {
              handleLoadMore()
            }
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
          {placeholders.map((_, index) => (
            <SwiperSlide
              key={`placeholder-${index}`}
              className={styles.swiperSlide}
            ></SwiperSlide>
          ))}
        </Swiper>
        {swiperStatus !== 'start' && postsCount > slidesPerView && (
          <div className={styles.prevArrow} onClick={handlePrev}></div>
        )}
        {swiperStatus !== 'end' && (
          <div className={styles.nextArrow} onClick={handleNext}></div>
        )}
      </ol>
    </div>
  )
}
