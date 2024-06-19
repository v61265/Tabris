import NoSearchResult from '~/components/search/no-search-result'
import type {
  PopularSearchItem,
  TVPost,
  TVPostResponse,
} from '~/types/api-data'
import SearchResult from '~/components/search/search-result'
import { fetchPopularPosts } from '~/components/errors/action'

type Slug = {
  params: Params
}

type Params = {
  keyword: string
}

// FIXME: tmp search url
const SEARCH_URL = 'http://localhost:8080/search'

const getSearchResult = async (keyword?: string): Promise<TVPostResponse> => {
  const response = await fetch(`${SEARCH_URL}/${keyword}`)
  const result = await response.json()
  return result
}

const page = async ({ params }: Slug) => {
  const keyword = decodeURI(params.keyword)
  let searchResultList: TVPost[] = []
  let popularPostList: PopularSearchItem[] = []
  try {
    const searchResultResponse = await getSearchResult('')
    searchResultList = searchResultResponse.body.hits.hits || []
  } catch (e) {
    console.error('searchResultList_error', e)
  }

  if (searchResultList.length === 0) {
    try {
      const { data } = await fetchPopularPosts()
      popularPostList = data.report
    } catch (e) {
      console.error('popularPostList_error', e)
    }
    return (
      <NoSearchResult keyword={keyword} popularPostList={popularPostList} />
    )
  }

  const searchResultProps = {
    keyword,
    searchResultList,
  }
  return <SearchResult {...searchResultProps} />
}

export default page
