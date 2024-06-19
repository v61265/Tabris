import { HeroImage } from './common'

export type ApiData = {
  id: string
  type: string
  alignment: string
  content: string[]
  styles: Record<string, unknown>
}

// search result api data type

type _SourceType = {
  audio: null
  briefHtml: string
  cameraOperators: unknown[]
  categories: { [key: string]: null | string }[]
  contentHtml: string
  designers: unknown[]
  engineers: unknown[]
  heroCaption: string
  heroImage: {
    name: string
    keywords: null | string[]
    urlMobileSized: string
  }
  heroVideo: null
  id: string
  name: string
  ogDescription: null
  ogImage: null
  ogTitle: null
  otherbyline: null
  photographers: { [key: string]: unknown }[]
  publishTime: string
  slug: string
  style: string
  subtitle: null | string
  tags: { [key: string]: string }[]
  topics: string[]
  vocals: string[]
  writers: { [key: string]: string }[]
}
export type TVPost = {
  _index: string
  _type: string
  _id: string
  _score: null
  _source: _SourceType
  sort: number[]
}
type _ShardsType = {
  total: number
  successful: number
  skipped: number
  failed: number
}

type HitsType = {
  total: {
    value: number
    relation: string
  }
  max_score: null | number
  hits: TVPost[]
}
export type TVPostResponse = {
  body: {
    took: number
    timed_out: boolean
    _shards: _ShardsType
    hits: HitsType
  }
}

// popular search result type

export type PopularSearchItem = {
  id: string
  heroImage: HeroImage | null
  name: string
  publishTime: string
  slug: string
  source: string
}

export type PopularSearchItemResponse = {
  report: PopularSearchItem[]
  start_date: string
  end_date: string
  generate_time: string
}
