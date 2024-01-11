import styles from '~/styles/components/flash-news/ui-pc-flash-news.module.scss'

export default function UiPcFlashNews({ flashNews }: any) {
  console.log('Pc', flashNews)
  return (
    <div>
      <div className={styles.pcWrapper}>Pc Flash News</div>
    </div>
  )
}
