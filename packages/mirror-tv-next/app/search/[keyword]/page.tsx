import React from 'react'
import SearchNoResult from '~/components/search/no-search-result'
import type { TVPost, TVPostResponse } from '~/types/api-data'
import SearchResult from '~/components/search/search-result'
// write typescript type of params
type Slug = {
  params: Params
}

type Params = {
  keyword: string
}

// FIXME: tmp search url
const SEARCH_URL = 'http://localhost:8080/search'

const getSearchResult = async (keyword?: string): Promise<TVPostResponse> => {
  // const response = await fetch(`${SEARCH_URL}/${keyword}`)
  const response = await fetch(`${SEARCH_URL}`)
  console.log(keyword)
  const result = await response.json()
  return result
}

const page = async ({ params }: Slug) => {
  const keyword = decodeURI(params.keyword)
  let searchResultList: TVPost[] = []

  try {
    const searchResultResponse = await getSearchResult('')
    searchResultList = searchResultResponse.body.hits.hits || []
  } catch (e) {
    console.error('searchResultList_error', e)
  }

  if (searchResultList.length === 0) {
    return <SearchNoResult keyword={keyword} />
  }

  const searchResultProps = {
    keyword,
    searchResultList,
  }
  return <SearchResult {...searchResultProps} />
}

export default page
