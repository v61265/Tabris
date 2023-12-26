'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Category } from '~/graphql/query/categories'
import styles from './nav-items.module.css'

type NavItemProps = {
  categories: Category[]
}

export default function NavItems({ categories }: NavItemProps) {
  console.log(categories)

  const [showRest, setShowRest] = useState(false)
  const [totalVisibleCategories, setTotalVisibleCategories] = useState(9)

  const handleSeeMoreClick = () => {
    setShowRest((prevState) => !prevState)
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      // Define your threshold for tablet width here, for example, 768px
      const tabletWidthThreshold = 1200

      if (width <= tabletWidthThreshold) {
        setTotalVisibleCategories(5) // Set totalVisibleCategories to 5 for tablet
      } else {
        setTotalVisibleCategories(9) // Set totalVisibleCategories to 9 for PC
      }
    }

    // Add event listener for resize to detect changes in viewport width
    window.addEventListener('resize', handleResize)

    // Call handleResize once initially to set the correct value on component mount
    handleResize()

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.visibleCategories}>
        <li className={styles.li}>
          <Link href="/category/video">影音</Link>
        </li>
        {categories.slice(0, totalVisibleCategories).map((category) => (
          <li key={category.id} className={styles.li}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
        <li className={styles.li}>節目列表</li>
        {categories.length > totalVisibleCategories && (
          <li onClick={handleSeeMoreClick} className={styles.li}>
            看更多
          </li>
        )}
      </div>
      <div
        className={`${styles.restOfCategories} ${showRest ? styles.show : ''}`}
      >
        {categories.slice(totalVisibleCategories).map((category) => (
          <li key={category.id} className={styles.li}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </div>
    </div>
  )
}
