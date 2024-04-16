import HeroImg from '~/components/ombuds/hero-img'
import OmbudsIntro from '~/components/ombuds/ombuds-intro'
import OmbudsArticleContainer from '~/components/ombuds/ombuds-article-container'
import IconLinkList from '~/components/ombuds/iconLinkList'
import styles from '~/styles/pages/ombuds-page.module.scss'

export default function Ombuds() {
  return (
    <main className={styles.main}>
      <HeroImg />
      <OmbudsIntro />
      <OmbudsArticleContainer />
      <IconLinkList />
    </main>
  )
}
