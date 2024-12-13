import Aside from '~/components/story/aside'
import styles from './_styles/story.module.scss'
import ArticleRelatedPosts from '~/components/story/article-related-posts'
import { fetchStoryBySlug } from '~/app/_actions/story/fetch-story-post-by-slug'
import { cloneElement } from 'react'

export default async function StoryPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const { slug } = params
  const fetchStoryBySlugResponse = await fetchStoryBySlug(slug)
  const [storyData] = fetchStoryBySlugResponse
  const { relatedPosts } = storyData
  return (
    <div className={styles.wrapper}>
      <section className={styles.story}>
        <main className={styles.article}>
          {cloneElement(children as React.ReactElement, {
            fetchStoryBySlugResponse,
          })}
          <ArticleRelatedPosts relatedPosts={relatedPosts} />
        </main>
        <Aside />
      </section>
    </div>
  )
}
