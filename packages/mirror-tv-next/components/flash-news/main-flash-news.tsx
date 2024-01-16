import {
  FLASH_NEWS_JSON_URL,
  GLOBAL_CACHE_SETTING,
} from '~/constants/environment-variables'
import styles from '~/styles/components/flash-news/main-flash-news.module.scss'
import UiMobFlashNews from './ui-mob-flash-news'
import UiPcFlashNews from './ui-pc-flash-news'

async function getData() {
  const res = await fetch(FLASH_NEWS_JSON_URL, {
    next: { revalidate: GLOBAL_CACHE_SETTING },
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch flashNews data')
  }

  return res.json()
}

export default async function MainFlashNews() {
  const { allPosts } = await getData()
  const flashNews = allPosts
  console.log(allPosts)

  return (
    <>
      <div className={styles.pcWrapper}>
        <UiPcFlashNews flashNews={flashNews} />
      </div>
      <div className={styles.mobWrapper}>
        <UiMobFlashNews flashNews={flashNews} />
      </div>
    </>
  )
}
