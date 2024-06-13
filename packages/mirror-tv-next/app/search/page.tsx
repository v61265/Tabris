import React from 'react'
import dynamic from 'next/dynamic'
import styles from '~/styles/pages/search-page.module.scss'
import { GPTPlaceholderMobile } from '~/components/ads/gpt/gpt-placeholder'
const page = () => {
  const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))
  return (
    <main className={styles.main}>
      <GPTPlaceholderMobile>
        <p>廣告</p>
        {/* TODO: ad key */}
        <GPTAd pageKey="home" adKey="MB_M1" />
      </GPTPlaceholderMobile>
    </main>
  )
}

export default page
