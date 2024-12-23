import Aside from '~/components/story/aside'
import styles from './_styles/story.module.scss'

export default function StoryPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={styles.story}>
      {children}
      <Aside />
    </section>
  )
}
