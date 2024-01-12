import MainFlashNews from '~/components/flash-news/main-flash-news'
import styles from '~/styles/pages/page.module.scss'

export default function Home() {
  return (
    <>
      <div className={styles.mobFlashNewsWrapper}>
        <MainFlashNews />
      </div>
      <main className={styles.main}>
        <p>Hello, world.</p>
      </main>
    </>
  )
}
