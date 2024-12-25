import Aside from '~/components/story/aside'
import styles from './_styles/story.module.scss'
import { cloneElement } from 'react'

export default function StoryPageLayout({
  children,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  return (
    <div className={styles.wrapper}>
      <section className={styles.story}>
        <main className={styles.article}>
          {cloneElement(children as React.ReactElement)}
        </main>
        <Aside />
      </section>
    </div>
  )
}
