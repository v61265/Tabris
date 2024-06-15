import React from 'react'
import Image from 'next/image'
import styles from '~/styles/pages/search-page.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import { PopularSearchItem } from '~/types/api-data'
type SearchNoResultProps = {
  width: number
  height: number
  keyword: string
  popularResultList: PopularSearchItem[]
}

const SearchNoResult = ({
  width,
  height,
  keyword,
  popularResultList,
}: SearchNoResultProps) => {
  return (
    <main className={styles.main}>
      <div>
        <Image
          src="/images/tv-man.svg"
          alt="查無結果"
          width={width}
          height={height}
        />
      </div>
      <section className={styles.noResultTxt}>
        <p>您搜尋的「{keyword}」</p>
        <p>查無相關結果</p>
      </section>
      <div className={styles.borderdHeadingWrapper}>
        <p>熱門新聞</p>
      </div>
      <div className={styles.divider} />
      <ul className={styles.popularResultList}>
        {popularResultList.map((popularPost) => {
          const date = new Date(popularPost.publishTime)
          const props = {
            title: popularPost.name,
            date,
            href: `/story/${popularPost.slug}`,
            images: {
              original: popularPost.heroImage?.urlMobileSized || '',
              w400: popularPost.heroImage?.urlMobileSized || '',
            },
            postStyle: 'article',
            mobileLayoutDirection: 'column' as 'column' | 'row',
            postTitleHighlightText: '',
          }
          return (
            <li key={popularPost.id}>
              <UiPostCard {...props} />
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default SearchNoResult
