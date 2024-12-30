import Aside from '~/components/story/aside'
import styles from './_styles/story.module.scss'
import { fetchHeroImageBySlug } from '~/app/_actions/story/fetch-hero-image-by-slug'
import ArticleHeroImage from '~/components/story/article-hero-image'

export default async function StoryPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const response = await fetchHeroImageBySlug(params.slug)
  const { heroImage, heroCaption } = response[0]
  return (
    <div className={styles.wrapper}>
      <span className={styles.heroImageMobile}>
        <ArticleHeroImage heroImage={heroImage} title={heroCaption} />
      </span>
      <section className={styles.story}>
        <main className={styles.article}>
          <span className={styles.heroImageDesktop}>
            <ArticleHeroImage heroImage={heroImage} title={heroCaption} />
          </span>
          {children}
        </main>
        <Aside />
      </section>
    </div>
  )
}
