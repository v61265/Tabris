'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './_styles/no-search-result.module.scss'
import { fetchPopularPosts } from '../errors/action'
import { formatArticleCard } from '~/utils'
import type { FormattedPostCard } from '~/utils'
import Link from 'next/link'
import ResponsiveImage from '../shared/responsive-image'
import useWindowDimensions from '~/hooks/use-window-dimensions'
type SearchNoResultProps = {
  keyword: string
}

const SearchNoResult = ({ keyword }: SearchNoResultProps) => {
  const [popularPosts, setPopularPosts] = useState([])
  const { width = 0 } = useWindowDimensions()
  const isDesktop = width > 768
  const formattedPostsCount = isDesktop ? 4 : 3

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const { data } = await fetchPopularPosts()
        setPopularPosts(data.report)
      } catch (error) {
        console.error('Error fetching popular posts:', error)
      }
    }

    fetchDataAndSetState()
  }, [])

  const formattedPosts: FormattedPostCard[] =
    popularPosts.map(formatArticleCard)

  return (
    <main className={styles.main}>
      <div>
        <Image
          src="/images/tv-man.svg"
          alt="查無結果"
          width={166}
          height={204}
          className={styles.noResultImg}
        />
      </div>
      <section className={styles.noResultTxt}>
        <p>您搜尋的「{keyword}」</p>
        <p>查無相關結果</p>
      </section>
      <div className={styles.borderdHeadingWrapper}>
        <p>熱門新聞</p>
      </div>
      <div className={styles.divider} />
      <ul className={styles.popularResultList}>
        {formattedPosts.slice(0, formattedPostsCount).map((article) => {
          return (
            <Link
              key={article.slug}
              href={article.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <li className={styles.img}>
                <ResponsiveImage
                  images={article.images}
                  alt={article.name}
                  priority={false}
                  rwd={{
                    mobile: '500px',
                    tablet: '500px',
                    laptop: '500px',
                    desktop: '500px',
                    default: '500px',
                  }}
                />
              </li>

              <p>{article.name}</p>
            </Link>
          )
        })}
      </ul>
    </main>
  )
}

export default SearchNoResult
