import styles from '~/styles/pages/category-layout.module.scss'
import CategoryPageLayoutAside from '~/components/category/layout/aside'
import dynamic from 'next/dynamic'
const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))
import { GPTPlaceholderDesktop } from '~/components/ads/gpt/gpt-placeholder'

export default async function CategoryPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <GPTPlaceholderDesktop>
        <p>廣告</p>
        <GPTAd pageKey="all" adKey="PC_HD" />
      </GPTPlaceholderDesktop>
      <section className={styles.category}>
        {children}
        <CategoryPageLayoutAside />
      </section>
    </main>
  )
}
