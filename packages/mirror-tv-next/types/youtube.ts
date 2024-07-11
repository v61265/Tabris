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
  items: YoutubeItem[] | void
  nextPageToken?: string
}

type PlayList = {
  id: string
  nextPageToken?: string
  items: YoutubeItem[]
}

export type { YoutubeItem, YoutubeResponse, PlayList }
