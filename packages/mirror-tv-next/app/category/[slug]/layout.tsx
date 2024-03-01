import styles from '~/styles/pages/category-layout.module.scss'
import CategoryPageLayoutAside from '~/components/category/layout/aside'

export default async function CategoryPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.category}>
      {children}
      <CategoryPageLayoutAside />
    </main>
  )
}
