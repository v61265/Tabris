import { fetchYoutubeList } from './action-yt'
import { handleResponse } from '~/utils'
import type { YoutubeItem, YoutubeResponse } from '~/types/youtube'
import type { FormatPlayListItems } from './youtube-list'
import YoutubeListHandler from './youtube-list-handler'

type YoutubeListHandlerProps = {
  urls: (string | null)[]
}

type YoutubeListInfoFormatted = {
  url: string
  sectionName: string
}

export default async function YoutubeListWrapper({
  urls = [],
}: YoutubeListHandlerProps) {
  const getListIdAndName = (inputString: string | null, index: number) => {
    if (!inputString) return null
    const idWithName = inputString.includes('playlist?list=')
      ? inputString.split('list=')[1]
      : inputString.split('https://youtu.be/')[1]
    const [
      url,
      sectionName = inputString?.split('：')[1] ??
        `選單 ${String.fromCharCode(index + 65)}`,
    ] = idWithName.split('：')
    return { url, sectionName }
  }
  const youtubeListIds = urls
    .filter((url) => url)
    .map((url, index) =>
      getListIdAndName(url, index)
    ) as YoutubeListInfoFormatted[]

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
    }
  }

  const listResponse = await Promise.allSettled(
    youtubeListIds.map((item) =>
      fetchYoutubeList({ list: { id: item.url, nextPageToken: '' }, take: 30 })
    )
  )

  const playListRendered: FormatPlayListItems[] = []

  listResponse.forEach((res, i) => {
    handleResponse(
      res,
      (res: Awaited<ReturnType<typeof fetchYoutubeList>> | undefined) => {
        if (!res) return
        const itemAndNextPageToken = formateYoutubeListRes(res)
        itemAndNextPageToken.name = youtubeListIds[i].sectionName
        playListRendered.push({
          ...formateYoutubeListRes(res),
          name: youtubeListIds[i].sectionName,
        })
      },
      'Error occurs while fetching youtube list in show page'
    )
  })

  return (
    <section>
      <YoutubeListHandler playLists={playListRendered} />
    </section>
  )
}
