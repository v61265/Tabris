import React from 'react'
import Image from 'next/image'
import styles from '~/styles/pages/search-page.module.scss'
import UiPostCard, { UiPostCardProps } from '~/components/shared/ui-post-card'
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
          className={styles.noResultImg}
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
        {popularResultList.map(({ publishTime, name, slug, id, heroImage }) => {
          const date = new Date(publishTime)
          const props = {
            title: name,
            date,
            href: `/story/${slug}`,
            images: {
              original: heroImage?.urlMobileSized || '',
              w400: heroImage?.urlMobileSized || '',
            },
            postStyle: 'article',
            mobileLayoutDirection:
              'column' as UiPostCardProps['mobileLayoutDirection'],
            postTitleHighlightText: '',
          }
          return (
            <li key={id}>
              <UiPostCard {...props} />
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default SearchNoResult
