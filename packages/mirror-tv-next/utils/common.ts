import errors from '@twreporter/errors'
import { FormatPlayListItems } from '~/components/show/_slug/youtube-list'
import type { ApiData } from '~/types/api-data'
import type { YoutubeItem, YoutubeResponse } from '~/types/youtube'

function isServer(): boolean {
  return typeof window === 'undefined'
}

// Extract YouTube video ID from URL
const extractYoutubeId = (url: string) => {
  const match = url?.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )

  return match ? match[1] : ''
}

const handleResponse = <
  T extends Record<string, unknown>,
  U extends PromiseSettledResult<T>,
  V
>(
  response: U,
  callback: (value: T | undefined) => V,
  errorMessage: string
): V => {
  if (response.status === 'fulfilled') {
    return callback(response.value)
  } else if (response.status === 'rejected') {
    const { graphQLErrors, clientErrors, networkError } = response.reason
    const annotatingError = errors.helpers.wrap(
      response.reason,
      'UnhandledError',
      errorMessage
    )

    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          annotatingError,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
        debugPayload: {
          graphQLErrors,
          clientErrors,
          networkError,
        },
      })
    )
  }
  return callback(undefined)
}

function handleMetaDesc(str: string) {
  if (!str || typeof str !== 'string') {
    return ''
  }
  // remove html tags and set length limit for meta descripton
  const pureStr = str?.replace(/<[^>]*>?/gm, '')
  const formatedStr = pureStr?.slice(0, 124) ?? ''
  return formatedStr.length > 123 ? formatedStr + '...' : formatedStr
}

function handleApiData(apiData: string): ApiData[] {
  try {
    const rawString = apiData ?? ''
    const content = JSON.parse(rawString)

    return content?.filter((item: ApiData) => item) || []
  } catch {
    return []
  }
}

const formateYoutubeListRes = (
  response: YoutubeResponse
): FormatPlayListItems => {
  const filteredItems = response?.items?.filter(
    (item) => item?.status?.privacyStatus === 'public'
  )
  const formatPlayListItems = (item: YoutubeItem) => {
    return {
      id: item?.snippet?.resourceId?.videoId,
      title: item?.snippet?.title,
    }
  }
  return {
    items: filteredItems?.map((item) => formatPlayListItems(item)) ?? [],
    nextPageToken: response?.nextPageToken,
    totalItems: response.pageInfo.totalResults,
  }
}

export {
  extractYoutubeId,
  isServer,
  handleResponse,
  handleApiData,
  handleMetaDesc,
  formateYoutubeListRes,
}
