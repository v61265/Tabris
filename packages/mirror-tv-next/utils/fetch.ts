import axios, { AxiosResponse } from 'axios'
import { SITE_URL } from '~/constants/environment-variables'
import type { YoutubeResponse } from '~/types/youtube'

class FetchError extends Error {
  public code: number

  constructor(url: string, message: string = 'Not Found', code: number = 404) {
    const errorMessage = `${message}, url: ${url}`
    super(errorMessage)
    this.name = this.constructor.name
    this.code = code
  }
}

async function fetchYoutubeData(url: string): Promise<YoutubeResponse> {
  try {
    const axiosConfig = {
      timeout: 3000,
    }
    const response: AxiosResponse = await axios.get(
      `${SITE_URL}/api/youtube${url}`,
      axiosConfig
    )
    return response.data
  } catch (err) {
    const error = err as FetchError
    throw new FetchError(url, error.message, error.code ?? 500)
  }
}

export { fetchYoutubeData, FetchError }
