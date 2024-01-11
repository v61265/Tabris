'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import xSrc from 'public/icons/icon-x.svg'
import { useEffect, useState } from 'react'
import { HEADER_BOTTOM_LINKS } from '~/constants/constant'
import type { Category } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'
import type { Sponsor } from '~/graphql/query/sponsors'
import fbSrc from '~/public/icons/icon-fb.svg'
import igSrc from '~/public/icons/icon-ig.svg'
import lineSrc from '~/public/icons/icon-line.svg'
import menuSrc from '~/public/icons/side-menu-icon.svg'
import styles from '~/styles/components/layout/header/mobile-header/side-menu.module.scss'

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
          <ul className={styles.items}>
            <li className={styles.otherLi}>
              <Link href={HEADER_BOTTOM_LINKS.ombuds}>公評人專區</Link>
            </li>
            <li className={styles.otherLi}>
              <Link href={HEADER_BOTTOM_LINKS.anchorperson}>鏡主播</Link>
            </li>
            <li className={styles.otherLi}>
              <Link href={HEADER_BOTTOM_LINKS.about}>關於我們</Link>
            </li>
          </ul>
          <ul className={styles.iconsWrapper}>
            <li className={styles.icon}>
              <Link
                href={HEADER_BOTTOM_LINKS.fb}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={fbSrc} alt="facebook icon" />
              </Link>
            </li>
            <li className={styles.icon}>
              <Link
                href={HEADER_BOTTOM_LINKS.line}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={lineSrc} alt="line icon" />
              </Link>
            </li>
            <li className={styles.icon}>
              <Link
                href={HEADER_BOTTOM_LINKS.ig}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={igSrc} alt="instagram icon" />
              </Link>
            </li>
            <li className={styles.icon}>
              <Link
                href={HEADER_BOTTOM_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={xSrc} alt="x(former twitter) icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
