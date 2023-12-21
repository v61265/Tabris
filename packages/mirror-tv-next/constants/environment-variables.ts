// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLCI_` 開頭)
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'
let SITE_URL: string
let GTM_ID: string
let GLOBAL_CACHE_SETTING: string
let HEADER_JSON_URL: string
let FLASH_NEWS_JSON_URL: string

switch (ENV) {
  case 'prod':
    SITE_URL = 'www.mnews.tw'
    GTM_ID = 'GTM-PK7VRFX'
    GLOBAL_CACHE_SETTING = 'public, max-age=300'
    HEADER_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-prod/json/featured_categories_post.json'
    FLASH_NEWS_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-prod/json/flash_news.json'

    break

  case 'staging':
    SITE_URL = 'staging.mnews.tw'
    GTM_ID = 'GTM-NFH6FDH'
    GLOBAL_CACHE_SETTING = 'public, max-age=300'
    HEADER_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-staging/json/featured_categories_post.json'
    FLASH_NEWS_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-staging/json/flash_news.json'

    break

  case 'dev':
    SITE_URL = 'dev.mnews.tw'
    GTM_ID = 'GTM-TVZ26W8'
    GLOBAL_CACHE_SETTING = 'no-store'
    HEADER_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-dev/json/featured_categories_post.json'
    FLASH_NEWS_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-dev/json/flash_news.json'

    break

  default:
    SITE_URL = 'localhost'
    GTM_ID = 'GTM-TVZ26W8'
    GLOBAL_CACHE_SETTING = 'no-store'
    HEADER_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-dev/json/featured_categories_post.json'
    FLASH_NEWS_JSON_URL =
      'https://storage.googleapis.com/static-mnews-tw-dev/json/flash_news.json'

    break
}

export {
  ENV,
  FLASH_NEWS_JSON_URL,
  GLOBAL_CACHE_SETTING,
  GTM_ID,
  HEADER_JSON_URL,
  SITE_URL,
}
