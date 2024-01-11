import UiMobFlashNews from '~/components/flash-news/ui-mob-flash-news'
import styles from '~/styles/pages/page.module.scss'

export default function Home() {
  return (
    <>
      <div className={styles.mobFlashNewsWrapper}>
        <UiMobFlashNews />
      </div>
      <main className={styles.main}>
        <p>Hello, world.</p>
      </main>
    </>
  )
}
