'use client'
import styles from './_styles/header-search-bar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const HeaderSearchBar = () => {
  const [keyword, setKeyword] = useState('')
  return (
    <section className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="請輸入關鍵字"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Link href={`/search/${keyword}`} className={styles.searchButton}>
        <Image
          className={styles.searchInputIcon}
          src="/icons/icon-search.svg"
          alt="search icon"
          width={26}
          height={28}
        />
      </Link>
    </section>
  )
}

export default HeaderSearchBar
