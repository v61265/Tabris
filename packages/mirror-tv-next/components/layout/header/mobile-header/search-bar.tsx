'use client'
import React, { useState } from 'react'
import styles from './_styles/search-bar.module.scss'
import Link from 'next/link'

const SearchBar = () => {
  const [isSearchBarShown, setIsSearchBarShown] = useState(false)
  const [keyword, setKeyword] = useState('')

  const toggleSearchBar = () => {
    setIsSearchBarShown((prevState) => !prevState)
  }

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  const handleSearch = () => {
    toggleSearchBar()
  }
  const searchIconClassName = isSearchBarShown
    ? `${styles.logo} ${styles.isActive}`
    : styles.logo

  return (
    <div className={styles.searchBarContainer}>
      <button onClick={toggleSearchBar}>
        <div className={searchIconClassName} />
      </button>
      {isSearchBarShown && (
        <section className={styles.searchBarSection}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchIconWrapper}>
              <Link href={`/search/${keyword}`} onClick={handleSearch}>
                <div className={styles.searchIcon} />
              </Link>
            </div>
            <input
              type="text"
              placeholder="請輸入關鍵字"
              className={styles.searchInput}
              onChange={handleInputOnChange}
            />
          </div>
          <div className={styles.modalOverlay} />
        </section>
      )}
    </div>
  )
}

export default SearchBar
