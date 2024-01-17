import gql from 'graphql-tag'
import { ListingPost, listingPost } from '../fragments/listingPost'

export type PostByTagName = ListingPost & {
  publishTime: string
}

const postsByTagName = gql`
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

export { postsByTagName }
