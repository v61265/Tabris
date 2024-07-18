import NoSearchResult from '~/components/search/no-search-result'
import SearchResult from '~/components/search/search-result'
import errors from '@twreporter/errors'
import { searchAPI } from '~/app/api/programmable-search'
import type { SearchResponse, SearchItem } from '~/types/search'

type Slug = {
  params: { keyword: string }
  query: Record<string, string>
}

export default async function SearchPage({ params, query }: Slug) {
  const keyword = decodeURI(params.keyword)
  const startIndex = Number(query?.start) || 1
  let searchResultList: SearchItem[] = []
  // let searchResultNumber: number = 0
  try {
    const inputValue = keyword || ''
    const response: SearchResponse = await searchAPI(inputValue, startIndex)

    searchResultList = response?.items || []
    // searchResultNumber =
    //   Number(response?.searchInformation?.totalResults) > 100
    //     ? 100
    //     : Number(response?.searchInformation?.totalResults) || 0
  } catch (err) {
    // All exceptions that include a stack trace will be
    // integrated with Error Reporting.
    // See https://cloud.google.com/run/docs/error-reporting
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
  }

  if (!searchResultList.length) return <NoSearchResult keyword={keyword} />

  const searchResultProps = {
    keyword,
    searchResultList,
  }
  return <SearchResult {...searchResultProps} />
}
