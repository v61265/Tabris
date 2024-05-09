import styles from '~/styles/pages/category-layout.module.scss'
import CategoryPageLayoutAside from '~/components/category/layout/aside'
import { GPTPlaceholderMobile } from '~/components/ads/gpt/gpt-placeholder'
import dynamic from 'next/dynamic'

const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))

export default async function CategoryPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <section className={styles.category}>
        <GPTPlaceholderMobile>
          <p>廣告</p>
          <GPTAd pageKey="category" adKey="MB_M1" />
        </GPTPlaceholderMobile>
        {children}
        <GPTAd pageKey="category" adKey="MB_M2" />
        <CategoryPageLayoutAside />
        <GPTAd pageKey="category" adKey="MB_M3" />
      </section>
    </main>
  )
}
