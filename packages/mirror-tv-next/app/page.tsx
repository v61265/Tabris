import dynamic from 'next/dynamic'
import MainFlashNews from '~/components/flash-news/main-flash-news'
import styles from '~/styles/pages/page.module.scss'
import {
  GPTPlaceholderDesktop,
  GPTPlaceholderMobileAndTablet,
} from '~/components/ads/gpt/gpt-placeholder'

const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))

export default function Home() {
  return (
    <main className={styles.main}>
      {/* GPT ADs */}
      <GPTPlaceholderDesktop>
        <p>廣告</p>
        <GPTAd pageKey="all" adKey="PC_HD" />
      </GPTPlaceholderDesktop>
      <GPTPlaceholderMobileAndTablet>
        <p>廣告</p>
        <GPTAd pageKey="home" adKey="MB_M1" />
      </GPTPlaceholderMobileAndTablet>
      <div className={styles.mobFlashNewsWrapper}>
        <MainFlashNews />
      </div>
    </main>
  )
}
