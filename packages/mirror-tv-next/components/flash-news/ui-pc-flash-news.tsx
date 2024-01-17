'use client'
import { useEffect, useState } from 'react'
import type { FlashNews } from '~/graphql/query/flash-news'
import styles from '~/styles/components/flash-news/ui-pc-flash-news.module.scss'

type UiPcFlashNewsProps = {
  flashNews: FlashNews[]
}

export default function UiPcFlashNews({ flashNews }: UiPcFlashNewsProps) {
  console.log('Pc', flashNews)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [move, setMove] = useState(-1)
  const [shouldTransition, setShouldTransition] = useState(false)

  let timeoutIdOfAuto

  useEffect(() => {
    autoToNext()

    // Cleanup function to clear the timeout on component unmount
    return () => {
      clearTimeout(timeoutIdOfAuto)
    }
  }, [currentIdx, move, shouldTransition])

  const displayedArticles = () => {
    const len = flashNews.length

    if (len < 1) {
      return []
    }

    const curIdxPositive = (currentIdx % len) + len

    return [
      flashNews[(curIdxPositive - 1) % len],
      flashNews[curIdxPositive % len],
      flashNews[(curIdxPositive + 1) % len],
    ]
  }

  const doesHaveArticles = flashNews.length > 0

  const toNext = () => {
    if (shouldTransition) {
      return
    }

    cancelAutoToNext()
    setShouldTransition(true)
    setMove((prevMove) => prevMove - 1)
  }

  const toPrev = () => {
    if (shouldTransition) {
      return
    }

    cancelAutoToNext()
    setShouldTransition(true)
    setMove((prevMove) => prevMove + 1)
  }

  const handleTransitionend = () => {
    setShouldTransition(false)

    switch (move) {
      case -2:
        setMove(-1)
        setCurrentIdx((prevIdx) => prevIdx + 1)
        break
      case 0:
        setMove(-1)
        setCurrentIdx((prevIdx) => prevIdx - 1)
        break
      default:
        break
    }

    autoToNext()
  }

  const autoToNext = () => {
    timeoutIdOfAuto = setTimeout(() => {
      toNext()
    }, 3000)
  }

  const cancelAutoToNext = () => {
    clearTimeout(timeoutIdOfAuto)
  }

  return (
    <div className={styles.flashNews}>
      <p className={styles.p}>快訊</p>

      {doesHaveArticles && (
        <div className={styles.container}>
          <div
            className={`${styles.titles} ${
              shouldTransition ? styles.transitioning : ''
            }`}
            style={{ transform: `translateY(${move * 100}%)` }}
            onTransitionEnd={handleTransitionend}
          >
            {displayedArticles().map((article) => (
              <a
                key={`flash-${article.slug}`}
                className={styles.news}
                href={`/story/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
