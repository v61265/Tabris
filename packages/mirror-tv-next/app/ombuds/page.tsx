import HeroImg from '~/components/ombuds/hero-img'
import OmbudsIntro from '~/components/ombuds/ombuds-intro'
import OmbudsArticleContainerMd from '~/components/ombuds/ombuds-article-container-md'
import FetchArticleDataXl from '~/components/ombuds/fetchArticleData-xl'
import IconLinkList from '~/components/ombuds/iconLinkList'
import styles from '~/styles/pages/ombuds-page.module.scss'
import type { Metadata } from 'next'
import { SITE_URL } from '~/constants/environment-variables'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '公評人專區 - 鏡新聞',
  openGraph: {
    title: '節目表 - 鏡新聞',
    images: {
      url: '/images/default-og-img.jpg',
    },
  },
}

export default function Ombuds() {
  return (
    <main className={styles.main}>
      <HeroImg />
      <OmbudsIntro />
      <OmbudsArticleContainerMd />
      <FetchArticleDataXl />
      <IconLinkList />
    </main>
  )
}
