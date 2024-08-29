'use client'
import UiLoadMoreButton from '../shared/ui-load-more-button'
import { PostCardItem } from '~/graphql/query/posts'
import { fetchPostsItems } from '~/components/category/action'
import styles from './_styles/posts-list-manager.module.scss'
import UiPostCard from '~/components/shared/ui-post-card'
import { formatArticleCard, FormattedPostCard } from '~/utils'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'

type PostsListManagerProps = {
  categorySlug: string
  pageSize: number
  postsCount: number
  initPostsList: FormattedPostCard[]
  salesLength: number
  filteredSlug: string[]
}

export default function PostsListManager({
  categorySlug,
  pageSize,
  postsCount,
  initPostsList,
  salesLength,
  filteredSlug = [],
}: PostsListManagerProps) {
  const formattedPostsList = (list: PostCardItem[]) =>
    list.map((post) => formatArticleCard(post))

  const handleClickLoadMore = async (page: number) => {
    const { allPosts: newPosts } = await fetchPostsItems({
      page,
      categorySlug,
      pageSize,
      isWithCount: false,
      salePostsCount: salesLength,
      filteredSlug,
    })
    return formattedPostsList(newPosts)
  }

  console.log(postsCount, pageSize)

  return (
    <>
      <section className={styles.list}>
        <InfiniteScrollList
          initialList={initPostsList}
          pageSize={pageSize}
          amountOfElements={postsCount}
          fetchListInPage={handleClickLoadMore}
          isAutoFetch={false}
          loader={<UiLoadMoreButton title="看更多" className={styles.more} />}
        >
          {(renderList) => (
            <ol className={styles.posts}>
              {renderList.map((postItem) => {
                return (
                  <li key={postItem.slug}>
                    <UiPostCard
                      href={postItem.href}
                      images={postItem.images}
                      title={postItem.name}
                      date={postItem.publishTime}
                      postStyle={postItem.style}
                      label={postItem.label ?? ''}
                      mobileLayoutDirection="row"
                    />
                  </li>
                )
              })}
            </ol>
          )}
        </InfiniteScrollList>
      </section>
    </>
  )
}
