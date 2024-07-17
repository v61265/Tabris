'use client'

import type { TVPost } from '~/types/api-data'
import styles from './_styles/search-page.module.scss'
import UiPostCard, {
  type UiPostCardProps,
} from '~/components/shared/ui-post-card'
import { formateHeroImage } from '~/utils'
import UiLoadMoreButton from '../shared/ui-load-more-button'
type SearchResultProps = {
  keyword: string
  searchResultList: TVPost[]
}
const SearchResult = ({ keyword, searchResultList }: SearchResultProps) => {
  const handleClickLoadMore = () => {
    // loadMore
  }
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
              images: formateHeroImage(heroImage),
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
        <UiLoadMoreButton title="看更多" onClick={handleClickLoadMore} />
      </ul>
    </main>
  )
}

export default SearchResult
