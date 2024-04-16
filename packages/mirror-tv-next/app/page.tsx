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
      {/* GPT ADs */}
      <div className={styles.gptAdContainerPc}>
        <p>廣告</p>
        <GPTAd pageKey="all" adKey="PC_HD" />
      </div>
      <div className={styles.gptAdContainerMb}>
        <p>廣告</p>
        <GPTAd pageKey="home" adKey="MB_M1" />
      </div>
    </main>
  )
}
