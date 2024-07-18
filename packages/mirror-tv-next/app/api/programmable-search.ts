import axios from 'axios'

import { URL_PROGRAMABLE_SEARCH } from '~/constants/constant'
import {
  PROGRAMMABLE_SEARCH_API_KEY,
  PROGRAMMABLE_SEARCH_ENGINE_ID,
} from '~/constants/config'

export async function searchAPI(query: string | string[], startIndex: number) {
  const url = `${URL_PROGRAMABLE_SEARCH}`
  const params = {
    cx: `${PROGRAMMABLE_SEARCH_ENGINE_ID}`,
    key: `${PROGRAMMABLE_SEARCH_API_KEY}`,
    q: query,
    start: startIndex,
    num: 10,
    safe: 'active',
  }

  try {
    const response = await axios.get(url, { params })
    const data = response.data

    return data
  } catch (error) {
    // console.error(error)
    // @ts-expect-error Property 'stack' is not guaranteed to exist on 'error'
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    return null
  }
}
