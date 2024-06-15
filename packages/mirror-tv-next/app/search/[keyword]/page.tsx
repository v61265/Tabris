/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styles from '~/styles/pages/search-page.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import SearchNoResult from '~/components/search/search-no-result'
import { POPULAR_POSTS_URL } from '~/constants/environment-variables'
// write typescript type of params
type slug = {
  params: params
}

type params = {
  keyword: string
}

// interface TVPost {
//   _index: string
//   _type: string
//   _id: string
//   _score: null
//   _source: {
//     audio: null
//     briefHtml: string
//     cameraOperators: any[]
//     categories: { [key: string]: any }[]
//     contentHtml: string
//     designers: any[]
//     engineers: any[]
//     heroCaption: string
//     heroImage: {
//       name: string
//       keywords: null | any
//       urlMobileSized: string
//     }
//     heroVideo: null | any
//     id: string
//     name: string
//     ogDescription: null | any
//     ogImage: null | any
//     ogTitle: null | any
//     otherbyline: null | any
//     photographers: { [key: string]: any }[]
//     publishTime: string
//     slug: string
//     style: string
//     subtitle: null | any
//     tags: { [key: string]: any }[]
//     topics: any[]
//     vocals: any[]
//     writers: { [key: string]: any }[]
//   }
//   sort: number[]
// }

const getSearchResult = async (keyword?: string) => {
  const response = await fetch('http://localhost:8080/search' + keyword)
  const result = await response.json()
  return result
}

const getPopularResult = async () => {
  console.log('call')
  const response = await fetch(POPULAR_POSTS_URL)
  const result = await response.json()
  return result
}

const page = async ({ params }: slug) => {
  const keyword = decodeURI(params.keyword)
  const searchNoResultProps = { width: 166, height: 204 }
  let searchResultList = []
  let popularResultList = []
  try {
    searchResultList = await getSearchResult('')
    searchResultList = await searchResultList.body.hits.hits
    await console.log(
      'searchResultList',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      searchResultList.find((item: any) => item._source.audio === null)
    )
  } catch (e) {
    console.error('searchResultList_error', e)
  }

  try {
    popularResultList = await getPopularResult()
    popularResultList = await popularResultList.report
    console.log('popularResultList', popularResultList[1])
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
        <ul>
          {popularResultList.map((popularPost: any) => {
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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {searchResultList.map((searchResult: any) => {
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
