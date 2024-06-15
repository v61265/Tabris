import React from 'react'

import { TVPost } from '~/types/api-data'
import styles from '~/styles/pages/search-page.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'

type SearchResultProps = {
  keyword: string
  searchResultList: TVPost[]
}
const SearchResult = ({ keyword, searchResultList }: SearchResultProps) => {
  return (
    <main className={styles.main}>
      <p className={styles.searchKeyword}>{keyword}</p>
      <ul className={styles.searchResultList}>
        {searchResultList.map((searchResult) => {
          const date = new Date(searchResult._source.publishTime)
          const props = {
            title: searchResult._source.name,
            date,
            href: `/story/${searchResult._source.slug}`,
            images: {
              original: searchResult._source.heroImage.urlMobileSized,
              w400: searchResult._source.heroImage.urlMobileSized,
            },
            postStyle: 'article',
            mobileLayoutDirection: 'column' as 'column' | 'row',
            postTitleHighlightText: '',
          }
          return (
            <li key={searchResult._id}>
              <UiPostCard {...props} />
            </li>
          )
        })}
        <button className={styles.seeMoreBtn}>看更多</button>
      </ul>
    </main>
  )
}

export default SearchResult
