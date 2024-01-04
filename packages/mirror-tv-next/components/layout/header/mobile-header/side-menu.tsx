'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Category } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'
import type { Sponsor } from '~/graphql/query/sponsors'
import menuSrc from '~/public/icons/side-menu-icon.svg'
import styles from './side-menu.module.css'

type SideMenuProps = {
  categories: Category[]
  shows: Show[]
  sponsors: Sponsor[]
}

export default function SideMenu({
  categories,
  shows,
  sponsors,
}: SideMenuProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const path = usePathname()

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }
  useEffect(() => {
    setIsSidebarOpen(false) // Close sidebar when pathname changes
  }, [path])

  // Conditionally set the class based on isSidebarOpen
  const sidebarWrapperClasses = `${styles.sidebarWrapper} ${
    isSidebarOpen ? styles.sidebarOpen : ''
  }`

  // Splitting shows into multiple columns with 7 shows each
  const columns = []
  const showsPerColumn = 7

  for (let i = 0; i < shows.length; i += showsPerColumn) {
    columns.push(shows.slice(i, i + showsPerColumn))
  }

  console.log(categories, shows, sponsors)
  return (
    <div>
      <button onClick={toggleSidebar} style={{ outline: 'none' }}>
        <Image src={menuSrc} alt="menu icon" priority />
      </button>
      <div className={sidebarWrapperClasses}>
        {/* Sponsors Block */}
        <div className={styles.sponsorsBlock}>
          <div className={styles.sponsorsWrapper}>
            {sponsors.map((sponsor) => {
              return (
                <div key={sponsor.id}>
                  <Link href={`/topic/${sponsor.topic.slug}`}>
                    <Image
                      src={sponsor.logo.urlMobileSized}
                      alt="Sponsor Logo"
                      width={100}
                      height={52}
                      priority
                      style={{
                        width: 100,
                        height: 52,
                      }}
                    />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Categories Block */}
        <ul className={styles.categoriesBlock}>
          <div className={styles.categoriesWrapper}>
            <li
              className={`${styles.li} ${
                path === '/category/video' ? styles.active : ''
              }`}
            >
              <Link href="/category/video">影音</Link>
            </li>
            {categories.map((category) => {
              // Check if the category's slug matches the path
              const isActive = path === `/category/${category.slug}`

              return (
                <li
                  key={category.id}
                  className={`${styles.li} ${isActive ? styles.active : ''}`}
                >
                  <Link href={`/category/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              )
            })}
          </div>
        </ul>

        {/* Shows Block */}
        <div className={styles.showsBlock}>
          {columns.map((column, columnIndex) => (
            <ul key={columnIndex} className={styles.showColumn}>
              {column.map((show) => {
                // Check if the show's slug matches the path
                const isActive = path === `/show/${show.slug}`

                return (
                  <li
                    key={show.id}
                    className={`${styles.showItem} ${
                      isActive ? styles.activeShow : ''
                    }`}
                  >
                    <Link href={`/show/${show.slug}`}>{show.name}</Link>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>

        {/* Bottom Block */}
        <div className={styles.bottomBlock}>
          <div>公評人專區</div>
          <div>鏡主播</div>
          <div>關於我們</div>
        </div>
      </div>
    </div>
  )
}
