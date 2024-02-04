import type { ApiData } from '~/types/data'

function handleApiData(apiData: ApiData) {
  try {
    const rawString = apiData
    const content = JSON.parse(rawString)

    return content?.filter((item: string) => item) || []
  } catch {
    return []
  }
}
