import React from 'react'
import styles from '~/styles/pages/search-page.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import SearchNoResult from '~/components/search/search-no-result'
import { POPULAR_POSTS_URL } from '~/constants/environment-variables'
import {
  PopularSearchItem,
  PopularSearchItemResponse,
  TVPost,
  TVPostResponse,
} from '~/types/api-data'
// write typescript type of params
type slug = {
  params: params
}

type params = {
  keyword: string
}

// FIXME: tmp search url
const SEARCH_URL = 'http://localhost:8080/search'

const getSearchResult = async (keyword?: string): Promise<TVPostResponse> => {
  const response = await fetch(`${SEARCH_URL}/${keyword}`)
  const result = await response.json()
  return result
}

const getPopularResult = async (): Promise<PopularSearchItemResponse> => {
  const response = await fetch(POPULAR_POSTS_URL)
  const result = await response.json()
  return result
}

const page = async ({ params }: slug) => {
  const keyword = decodeURI(params.keyword)
  const searchNoResultProps = { width: 166, height: 204 }
  let searchResultList: TVPost[] = []
  let popularResultList: PopularSearchItem[] = []
  try {
    const searchResultResponse = await getSearchResult('')
    searchResultList = searchResultResponse?.body?.hits?.hits || []
  } catch (e) {
    console.error('searchResultList_error', e)
  }

  try {
    const popularResultResponse = await getPopularResult()
    popularResultList = popularResultResponse?.report || []
  } catch (e) {
    console.error('searchResultList_error', e)
  }

  if (searchResultList.length === 0)
    return (
      <main className={styles.main}>
        <SearchNoResult {...searchNoResultProps} />
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

export default page
