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
  const [differentPostsCount, setDifferentPostsCount] = useState(() => {
    const renderedList = postsList.slice(0, pageSize)
    return {
      rendered: {
        posts: renderedList.filter((post) => post.__typeName !== 'External')
          .length,
        externals: renderedList.filter((post) => post.__typeName === 'External')
          .length,
      },
      fetched: {
        posts: initPostsList.length,
        externals: initExternalsList.length,
      },
    }
  })

  const handleClickLoadMore = async (page: number) => {
    // 如果庫存（fetch 到但還沒 render 的）不夠，則 fetch
    const { rendered, fetched } = differentPostsCount
    const isNeedFetchPost: boolean = fetched.posts - rendered.posts <= pageSize
    const isNeedFetchExternal: boolean =
      fetched.externals - rendered.posts <= pageSize

    let newPosts: PostCardItem[] = []
    let newExternals: External[] = []
    if (isNeedFetchPost) {
      const postRes = await fetchPostsItems({
        page: fetched.posts / pageSize,
        tagName,
        pageSize,
        isWithCount: false,
      })
      newPosts = postRes.allPosts ?? []
    }
    if (isNeedFetchExternal) {
      const externalRes = await fetchExternalsByTagName({
        page: fetched.externals / pageSize,
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
    const newListSlice = newPostList.slice(
      (page - 1) * pageSize,
      page * pageSize
    )
    setDifferentPostsCount((prev) => {
      return {
        rendered: {
          posts:
            prev.rendered.posts +
            newListSlice.filter((post) => post.__typeName !== 'External')
              .length,
          externals:
            prev.rendered.externals +
            newListSlice.filter((post) => post.__typeName === 'External')
              .length,
        },
        fetched: {
          posts: prev.fetched.posts + newPosts.length,
          externals: prev.fetched.externals + newExternals.length,
        },
      }
    })
    setPostsList(newPostList)
    return
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
