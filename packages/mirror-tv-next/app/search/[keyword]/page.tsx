import React from 'react'
import SearchNoResult from '~/components/search/search-no-result'
import { POPULAR_POSTS_URL } from '~/constants/environment-variables'
import {
  PopularSearchItem,
  PopularSearchItemResponse,
  TVPost,
  TVPostResponse,
} from '~/types/api-data'
import SearchResult from '~/components/search/search-result'
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
  function onlyShow4Results<T>(list: T[]): T[] {
    return list.slice(0, 4)
  }

  let searchResultList: TVPost[] = []
  let popularResultList: PopularSearchItem[] = []
  try {
    const searchResultResponse = await getSearchResult('')
    searchResultList = searchResultResponse?.body?.hits?.hits || []
  } catch (e) {
    console.error('searchResultList_error', e)
  }

  const searchResultProps = {
    keyword,
    searchResultList,
  }

  if (searchResultList.length === 0) {
    try {
      const popularResultResponse = await getPopularResult()
      popularResultList = onlyShow4Results(popularResultResponse?.report) || []
    } catch (e) {
      console.error('popularResultList_error', e)
    }
    // update after fetch
    const searchNoResultProps = {
      width: 166,
      height: 204,
      keyword,
      popularResultList,
    }
    return <SearchNoResult {...searchNoResultProps} />
  }

  return <SearchResult {...searchResultProps} />
}

export default page
