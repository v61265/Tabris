export type ApiData = {
  id: string
  type: string
  alignment: string
  content: string[]
  styles: Record<string, unknown>
}

// search result api data type

type _sourceType = {
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
export interface TVPost {
  _index: string
  _type: string
  _id: string
  _score: null
  _source: _sourceType
  sort: number[]
}
type _shardsType = {
  total: number
  successful: number
  skipped: number
  failed: number
}

type hitsType = {
  total: {
    value: number
    relation: string
  }
  max_score: null | number
  hits: TVPost[]
}
export interface TVPostResponse {
  body: {
    took: number
    timed_out: boolean
    _shards: _shardsType
    hits: hitsType
  }
}

// popular search result type

type HeroImage = {
  urlTinySized: string
  urlMobileSized: string
} | null

export type PopularSearchItem = {
  id: string
  heroImage: HeroImage
  name: string
  publishTime: string
  slug: string
  source: string
}

export interface PopularSearchItemResponse {
  report: PopularSearchItem[]
}
