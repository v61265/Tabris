'use client'
import { useRef, useState } from 'react'
import UiPostCard from '~/components/shared/ui-post-card'
import {
  fetchPostsItems,
  fetchExternalsByTagName,
} from '~/app/_actions/tag/posts-by-tag'
import { type PostCardItem } from '~/graphql/query/posts'
import styles from './_styles/posts-list-manager.module.scss'
import { formatArticleCard, type FormattedPostCard } from '~/utils'
import UiLoadMoreButton from '../shared/ui-load-more-button'
import { type External } from '~/graphql/query/externals'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'

type PostsListManagerProps = {
  tagName: string
  pageSize: number
  postsCount: number
  initPostsList: PostCardItem[]
  initExternalsList: External[]
  externalsCount: number
}

export default function PostsListManager({
  tagName,
  pageSize,
  postsCount,
  initPostsList,
  initExternalsList,
  externalsCount,
}: PostsListManagerProps) {
  const combineAndSortedByPublishedTime = (
    list: (PostCardItem | External | FormattedPostCard)[]
  ) => {
    return list
      .map((post) => formatArticleCard(post))
      .sort((a, b) => {
        const dateA = new Date(a.publishTime || 0).getTime()
        const dateB = new Date(b.publishTime || 0).getTime()
        return dateB - dateA
      })
  }
  const initFetchList = combineAndSortedByPublishedTime([
    ...initPostsList,
    ...initExternalsList,
  ])

  const [postsList, setPostsList] = useState<FormattedPostCard[]>(initFetchList)
  const listRef = useRef<HTMLOListElement | null>(null)

  // 計算每個 li 直屬的 a 元素中 href 以 '/external' 開頭的數量
  const countDirectLinksStartingWithExternal = (
    element: HTMLElement
  ): number => {
    let count = 0
    const listItems = element.getElementsByTagName('li')
    for (let i = 0; i < listItems.length; i++) {
      const anchor = listItems[i].querySelector('a')
      if (
        anchor &&
        anchor.href.startsWith(window.location.origin + '/external')
      ) {
        count++
      }
    }
    return count
  }

  const handleClickLoadMore = async (page: number) => {
    // 分別算出兩邊各自 rendered 和 fetched 了哪些篇數
    const liCount = listRef.current?.children?.length || 0
    const externalLinkCount = listRef.current
      ? countDirectLinksStartingWithExternal(listRef.current)
      : 0
    const renderedCount = {
      externals: externalLinkCount,
      posts: liCount - externalLinkCount,
    }
    const fetchedCount = {
      posts: postsList.filter((post) => post.__typeName !== 'External').length,
      externals: postsList.filter((post) => post.__typeName === 'External')
        .length,
    }
    // 如果庫存（fetch 到但還沒 render 的）不夠，則 fetch
    const isNeedFetchPost: boolean =
      fetchedCount.posts - renderedCount.posts <= pageSize
    const isNeedFetchExternal: boolean =
      fetchedCount.externals - renderedCount.posts <= pageSize

    let newPosts: PostCardItem[] = []
    let newExternals: External[] = []
    if (isNeedFetchPost) {
      const postRes = await fetchPostsItems({
        page: fetchedCount.posts / pageSize,
        tagName,
        pageSize,
        isWithCount: false,
      })
      newPosts = postRes.allPosts ?? []
    }
    if (isNeedFetchExternal) {
      const externalRes = await fetchExternalsByTagName({
        page: fetchedCount.externals / pageSize,
        tagName,
        pageSize,
        isWithCount: false,
      })
      newExternals = externalRes.allExternals ?? []
    }
    const newPostList = combineAndSortedByPublishedTime([
      ...postsList,
      ...newExternals,
      ...newPosts,
    ])
    setPostsList(newPostList)
    return newPostList.slice((page - 1) * pageSize, page * pageSize)
  }

  return (
    <>
      <section className={styles.list}>
        <InfiniteScrollList<FormattedPostCard>
          initialList={initFetchList.slice(0, pageSize)}
          pageSize={pageSize}
          isAutoFetch={false}
          amountOfElements={postsCount + externalsCount}
          fetchListInPage={handleClickLoadMore}
          loader={
            <div className={styles.btnWrapper}>
              <UiLoadMoreButton title="看更多" />
            </div>
          }
        >
          {(renderList) => (
            <ol className={styles.posts} ref={listRef}>
              {renderList.map((postItem) => (
                <li key={postItem.slug} className="list-handler__item">
                  <UiPostCard
                    href={postItem.href}
                    images={postItem.images}
                    title={postItem.name}
                    date={postItem.publishTime}
                    postStyle={postItem.style}
                    mobileLayoutDirection="column"
                  />
                </li>
              ))}
            </ol>
          )}
        </InfiniteScrollList>
      </section>
    </>
  )
}
