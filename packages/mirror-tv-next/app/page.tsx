import dynamic from 'next/dynamic'
import MainFlashNews from '~/components/flash-news/main-flash-news'
import styles from '~/styles/pages/page.module.scss'
import { GPTPlaceholderMobile } from '~/components/ads/gpt/gpt-placeholder'

const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))

export default function Home() {
  return (
    <main className={styles.main}>
      {/* GPT ADs */}
      <GPTPlaceholderMobile>
        <p>廣告</p>
        <GPTAd pageKey="home" adKey="MB_M1" />
      </GPTPlaceholderMobile>
      <div className={styles.mobFlashNewsWrapper}>
        <MainFlashNews />
      </div>
    </main>
  )
}
