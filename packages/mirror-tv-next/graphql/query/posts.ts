import gql from 'graphql-tag'
import { ListingPost, listingPost } from '../fragments/listing-post'

export type PostCardItem = ListingPost & {
  publishTime: string
}

const getPostsByTagName = gql`
  query fetchPostsByTagName(
    $tagName: String!
    $first: Int = 12
    $skip: Int = 0
    $withCount: Boolean = false
    $filteredSlug: [String] = [""]
  ) {
    allPosts(
      where: {
        state: published
        slug_not_in: $filteredSlug
        categories_some: { slug_not_in: "ombuds" }
        tags_some: { name: $tagName }
      }
      first: $first
      skip: $skip
      sortBy: publishTime_DESC
    ) {
      publishTime
      ...listingPostFragment
    }
    _allPostsMeta(
      where: {
        state: published
        slug_not_in: $filteredSlug
        categories_some: { slug_not_in: "ombuds" }
        tags_some: { name: $tagName }
      }
    ) @include(if: $withCount) {
      count
    }
  }
  ${listingPost}
`

const getLatestPosts = gql`
  query fetchLatestPosts($first: Int = 5, $filteredSlug: [String] = [""]) {
    allPosts(
      where: {
        slug_not_in: $filteredSlug
        categories_some: { slug_not_in: "ombuds" }
        state: published
      }
      first: $first
      sortBy: publishTime_DESC
    ) {
      publishTime
      ...listingPostFragment
    }
  }
  ${listingPost}
`

const getPostsByCategorySlug = gql`
  query fetchPostsByCategorySlug(
    $categorySlug: String!
    $first: Int = 13
    $skip: Int = 0
    $withCount: Boolean = false
    $filteredSlug: [String] = [""]
  ) {
    allPosts(
      where: {
        state: published
        slug_not_in: $filteredSlug
        categories_some: { slug: $categorySlug }
      }
      first: $first
      skip: $skip
      sortBy: publishTime_DESC
    ) {
      publishTime
      ...listingPostFragment
    }

    _allPostsMeta(
      where: {
        state: published
        slug_not_in: $filteredSlug
        categories_some: { slug: $categorySlug }
      }
    ) @include(if: $withCount) {
      count
    }
  }
  ${listingPost}
`

export { getPostsByTagName, getLatestPosts, getPostsByCategorySlug }
