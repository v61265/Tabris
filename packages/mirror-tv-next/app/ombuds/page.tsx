import HeroImg from '~/components/ombuds/hero-img'
import OmbudsIntro from '~/components/ombuds/ombuds-intro'
import OmbudsArticleContainerMb from '~/components/ombuds/ombuds-article-container-mb'
import FetchArticleDataPc from '~/components/ombuds/fetchArticleData-pc'
import IconLinkList from '~/components/ombuds/iconLinkList'
import styles from '~/styles/pages/ombuds-page.module.scss'
import type { Metadata } from 'next'
import { SITE_URL } from '~/constants/environment-variables'
import dynamic from 'next/dynamic'
const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))
import { GPTPlaceholderDesktop } from '~/components/ads/gpt/gpt-placeholder'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '公評人專區 - 鏡新聞',
  openGraph: {
    title: '公評人專區 - 鏡新聞',
    images: {
      url: '/images/default-og-img.jpg',
    },
  },
}

export default function Ombuds() {
  return (
    <main className={styles.main}>
      <GPTPlaceholderDesktop>
        <p>廣告</p>
        <GPTAd pageKey="all" adKey="PC_HD" />
      </GPTPlaceholderDesktop>
      <HeroImg />
      <OmbudsIntro />
      <OmbudsArticleContainerMb />
      <FetchArticleDataPc />
      <IconLinkList />
    </main>
  )
}
