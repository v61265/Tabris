import styles from '~/styles/components/ombuds/ombuds-intro.module.scss'
import ArticleContentVideo from '~/components/shared/article-content-video'
import Link from 'next/link'

export default function ombudsIntro() {
  return (
    <section className={styles.ombudsIntroContent}>
      <h2 className={styles.ombudsTitle}>外部公評人翁秀琪</h2>
      <div className={styles.ombudsIntroWrapper}>
        <div className={styles.videoWrapper}>
          <ArticleContentVideo
            videoSrc={
              'https://statics.mnews.tw/assets/videos/ckrvhg947002n10o4b2wvcpph.mp4'
            }
            autoPlay={true}
            loop={true}
            muted={true}
          />
        </div>

        <article className={styles.introArticle}>
          <p className={styles.para}>
            翁秀琪是德國曼茵茲大學大眾傳播學博士，在傳播學術界擔任教職逾三十年。2021年1月1日起，擔任鏡電視新聞台外部公評人。主要工作在確保新聞內容符合正確、平衡、公平和好的品味，並代表閱聽人的利益，處理公眾申訴案件，扮演閱聽眾和電視台之間的溝通橋梁。外部公評人獨立於鏡電視新聞台，直接向董事會負責，任期三年，得連任。
          </p>
          <div className={styles.linkWrapper}>
            <Link href="/story/biography" target="_blank">
              了解更多
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
