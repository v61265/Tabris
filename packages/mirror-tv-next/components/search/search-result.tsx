'use client'
import React from 'react'
import styles from './_styles/search-page.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import { formateHeroImage } from '~/utils'
import UiLoadMoreButton from '../shared/ui-load-more-button'
import type { SearchItem } from '~/types/search'

type SearchResultProps = {
  keyword: string
  searchResultList: SearchItem[]
}
const SearchResult = ({ keyword, searchResultList }: SearchResultProps) => {
  const handleClickLoadMore = () => {
    // loadMore
  }
  return (
    <main className={styles.main}>
      <p className={styles.searchKeyword}>{keyword}</p>
      <ol className={`${styles.searchResultList} search-result__list`}>
        {searchResultList.map((item) => {
          const date = new Date(
            item.pagemap.metatags?.[0]?.['article:published_time'] ?? ''
          )
          const props = {
            title: item.title,
            date,
            href: item.link,
            images: formateHeroImage(
              item?.pagemap?.cse_image?.[0]?.src
                ? {
                    urlOriginal: item?.pagemap?.cse_image?.[0]?.src,
                  }
                : {}
            ),
            postStyle: 'article',
            mobileLayoutDirection: 'column' as const,
            postTitleHighlightText: '',
          }
          return (
            <li key={item.htmlTitle}>
              <UiPostCard {...props} />
            </li>
          )
        })}
      </ol>
      <UiLoadMoreButton title="看更多" onClick={handleClickLoadMore} />
    </main>
  )
}

export default SearchResult
