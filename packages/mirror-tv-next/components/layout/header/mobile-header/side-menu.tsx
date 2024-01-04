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
  const currentPathname = usePathname()

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }
  useEffect(() => {
    setIsSidebarOpen(false) // Close sidebar when pathname changes
  }, [currentPathname])

  // Conditionally set the class based on isSidebarOpen
  const sidebarWrapperClasses = `${styles.sidebarWrapper} ${
    isSidebarOpen ? styles.sidebarOpen : ''
  }`

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
          <li className={styles.li}>
            <Link href="/category/video">影音</Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>

        {/* Shows Block */}
        <div className={styles.showsBlock}>
          {shows.map((show) => (
            <div key={show.id}>{show.name}</div>
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
