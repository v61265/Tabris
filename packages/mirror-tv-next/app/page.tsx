import dynamic from 'next/dynamic'
import MainFlashNews from '~/components/flash-news/main-flash-news'
import styles from '~/styles/pages/page.module.scss'

const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mobFlashNewsWrapper}>
        <MainFlashNews />
      </div>
      <p>Hello, world.</p>
      {/* Test GPT ADs */}
      <div>
        <GPTAd pageKey="story" adKey="PC_R2" />
        <GPTAd pageKey="all" adKey="PC_HD" />
      </div>
    </main>
  )
}
