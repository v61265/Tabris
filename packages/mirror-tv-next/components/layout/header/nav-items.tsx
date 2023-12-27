'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Category } from '~/graphql/query/categories'
import styles from './nav-items.module.css'

type NavItemProps = {
  categories: Category[]
}

export default function NavItems({ categories }: NavItemProps) {
  const path = usePathname()

  const [showRest, setShowRest] = useState(false)
  const [totalVisibleCategories, setTotalVisibleCategories] = useState(9)

  const handleSeeMoreClick = () => {
    setShowRest((prevState) => !prevState)
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
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
      <div className={styles.navWrapper}>
        <div className={styles.visibleItems}>
          <li
            className={`${styles.li} ${
              path === '/category/video' ? styles.active : ''
            }`}
          >
            <Link href="/category/video">影音</Link>
          </li>
          {categories.slice(0, totalVisibleCategories).map((category) => {
            // Check if the category's slug matches the path
            const isActive = path === `/category/${category.slug}`

            return (
              <li
                key={category.id}
                className={`${styles.li} ${isActive ? styles.active : ''}`}
              >
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            )
          })}
          <li className={styles.li}>節目列表</li>
          {categories.length > totalVisibleCategories && (
            <li
              onClick={handleSeeMoreClick}
              className={`${styles.li} ${styles.grey}`}
            >
              看更多
            </li>
          )}
        </div>
      </div>
      <div
        className={`${styles.restOfCategories} ${
          showRest ? styles.showRest : ''
        }`}
      >
        {categories.slice(totalVisibleCategories).map((category) => {
          const isActive = path === `/category/${category.slug}`

          return (
            <li
              key={category.id}
              className={`${styles.liRest} ${isActive ? styles.activeRe : ''}`}
            >
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </li>
          )
        })}
      </div>
    </div>
  )
}
