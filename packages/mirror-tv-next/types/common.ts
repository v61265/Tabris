import type { PostImage } from '~/utils/image-handler'

export type FlashNews = {
  slug: string
  name: string
}

export type Schedule = {
  'Channel ID': string
  Year: string
  WeekDay: string
  'Start Time(hh)': string
  'Start Time(mm)': string
  Duration: string
  Programme: string
  'Programme(en)': string
  'ep no': string
  'ep name': string
  'season no': string
  Class: string
  TxCategory: string
  Month: string
  Day: string
}

export type FormatePostCard = {
  href: string
  articleImgURLs: PostImage
  articleTitle: string
  articleStyle: string
  articleDate: Date
}
