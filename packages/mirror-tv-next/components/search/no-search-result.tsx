'use client'
import Image from 'next/image'
import styles from './_styles/no-search-result.module.scss'
import { formatePostImage } from '~/utils'
import type { FormattedPostCard } from '~/utils'
import Link from 'next/link'
import ResponsiveImage from '../shared/responsive-image'
import useWindowDimensions from '~/hooks/use-window-dimensions'
import type { PopularSearchItem } from '~/types/api-data'
import type { PostCardItem } from '~/graphql/query/posts'
type NoSearchResultProps = {
  keyword: string
  popularPostList: PopularSearchItem[]
}

const NoSearchResult = ({ keyword, popularPostList }: NoSearchResultProps) => {
  const { width = 0 } = useWindowDimensions()
  const isDesktop = width > 1200
  const formattedPostsCount = isDesktop ? 4 : 3
  const formatArticleCard = (articleCardList: PopularSearchItem) => {
    return {
      href: `/story/${articleCardList.slug}`,
      slug: articleCardList.slug,
      name: articleCardList.name,
      images: formatePostImage(articleCardList as PostCardItem),
      publishTime: new Date(articleCardList.publishTime),
    }
  }

  const formattedPosts: FormattedPostCard[] =
    popularPostList.map(formatArticleCard)

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

export default NoSearchResult
