type YoutubeItem = {
  id: string
  title: string
  snippet: {
    resourceId: {
      videoId: string
    }
    title: string
  }
  status: {
    privacyStatus: string
  }
}

type YoutubeResponse = {
  id: string
  items: YoutubeItem[] | void
  nextPageToken?: string
  pageInfo: { resultsPerPage: number; totalResults: number }
}

export type { YoutubeItem, YoutubeResponse }
