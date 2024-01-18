import MainFlashNews from '~/components/flash-news/main-flash-news'
import styles from '~/styles/pages/page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mobFlashNewsWrapper}>
        <MainFlashNews />
      </div>
      <p>Hello, world.</p>
    </main>
  )
}
