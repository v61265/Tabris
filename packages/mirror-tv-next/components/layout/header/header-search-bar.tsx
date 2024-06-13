import React from 'react'
import styles from './_styles/header-search-bar.module.scss'
import Image from 'next/image'

const HeaderSearchBar = () => {
  return (
    <section className={styles.container}>
      <input className={styles.input} type="text" placeholder="" />
      <button className={styles.searchButton}>
        <Image
          className={styles.searchInputIcon}
          src="/icons/icon-search.svg"
          alt="search icon"
          width={26}
          height={28}
        />
      </button>
    </section>
  )
}

export default HeaderSearchBar
