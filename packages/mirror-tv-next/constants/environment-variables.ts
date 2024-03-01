// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLCI_` 開頭)
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'
let SITE_URL: string
let GTM_ID: string
let GLOBAL_CACHE_SETTING: number
let HEADER_JSON_URL: string
let FLASH_NEWS_JSON_URL: string
let SCHEDULE_JSON_URL: string
let POPULAR_POSTS_URL: string

switch (ENV) {
  case 'prod':
    SITE_URL = 'www.mnews.tw'
    GTM_ID = 'GTM-PK7VRFX'
    GLOBAL_CACHE_SETTING = 300
    HEADER_JSON_URL = 'https://mnews.tw/json/header_v2.json'
    FLASH_NEWS_JSON_URL = 'https://mnews.tw/json/flash_news.json'
    SCHEDULE_JSON_URL = 'https://mnews.tw/json/tv-schedule.json'
    POPULAR_POSTS_URL = 'https://mnews.tw/json/popularlist.json'

    break

  case 'staging':
    SITE_URL = 'staging.mnews.tw'
    GTM_ID = 'GTM-NFH6FDH'
    GLOBAL_CACHE_SETTING = 300
    HEADER_JSON_URL = 'https://staging.mnews.tw/json/header_v2.json'
    FLASH_NEWS_JSON_URL = 'https://staging.mnews.tw/json/flash_news.json'
    SCHEDULE_JSON_URL = 'https://staging.mnews.tw/json/tv-schedule.json'
    POPULAR_POSTS_URL = 'https://staging.mnews.tw/json/popularlist.json'

    break

  case 'dev':
    SITE_URL = 'dev.mnews.tw'
    GTM_ID = 'GTM-TVZ26W8'
    GLOBAL_CACHE_SETTING = 0
    HEADER_JSON_URL = 'https://dev.mnews.tw/json/header_v2.json'
    FLASH_NEWS_JSON_URL = 'https://dev.mnews.tw/json/flash_news.json'
    SCHEDULE_JSON_URL = 'https://dev.mnews.tw/json/tv-schedule.json'
    POPULAR_POSTS_URL = 'https://dev.mnews.tw/json/popularlist.json'

    break

  default:
    SITE_URL = 'localhost'
    GTM_ID = 'GTM-TVZ26W8'
    GLOBAL_CACHE_SETTING = 0
    HEADER_JSON_URL = 'https://dev.mnews.tw/json/header_v2.json'
    FLASH_NEWS_JSON_URL = 'https://dev.mnews.tw/json/flash_news.json'
    SCHEDULE_JSON_URL = 'https://dev.mnews.tw/json/tv-schedule.json'
    POPULAR_POSTS_URL = 'https://dev.mnews.tw/json/popularlist.json'

    break
}

export {
  ENV,
  FLASH_NEWS_JSON_URL,
  GLOBAL_CACHE_SETTING,
  GTM_ID,
  HEADER_JSON_URL,
  SCHEDULE_JSON_URL,
  SITE_URL,
  POPULAR_POSTS_URL,
}
