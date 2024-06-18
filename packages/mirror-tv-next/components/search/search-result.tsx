import React from 'react'

import type { TVPost } from '~/types/api-data'
import styles from '~/styles/pages/search-page.module.scss'
import UiPostCard, {
  type UiPostCardProps,
} from '~/components/shared/ui-post-card'

type SearchResultProps = {
  keyword: string
  searchResultList: TVPost[]
}
const SearchResult = ({ keyword, searchResultList }: SearchResultProps) => {
  return (
    <main className={styles.main}>
      <p className={styles.searchKeyword}>{keyword}</p>
      <ul className={styles.searchResultList}>
        {searchResultList.map(
          ({ _source: { publishTime, name, slug, heroImage }, _id }) => {
            const date = new Date(publishTime)
            const props = {
              title: name,
              date,
              href: `/story/${slug}`,
              images: {
                original: heroImage.urlMobileSized,
                w400: heroImage.urlMobileSized,
              },
              postStyle: 'article',
              mobileLayoutDirection:
                'column' as UiPostCardProps['mobileLayoutDirection'],
              postTitleHighlightText: '',
            }
            return (
              <li key={_id}>
                <UiPostCard {...props} />
              </li>
            )
          }
        )}
        <button className={styles.seeMoreBtn}>看更多</button>
      </ul>
    </main>
  )
}

export default SearchResult
