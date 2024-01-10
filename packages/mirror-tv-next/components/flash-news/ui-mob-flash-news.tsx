import styles from '~/styles/components/flash-news/ui-mob-flash-news.module.scss'

export default function UiMobFlashNews({ flashNews }: any) {
  console.log('Mobile', flashNews)
  return (
    <div>
      <div className={styles.mobWrapper}>Mob Flash News</div>
    </div>
  )
}
