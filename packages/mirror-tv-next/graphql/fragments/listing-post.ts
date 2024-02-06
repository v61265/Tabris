import gql from 'graphql-tag'

export type ListingPost = {
  slug: string
  style: string
  name: string
  heroImage: {
    urlMobileSized: string
    urlOriginal: string
    urlDesktopSized: string
    urlTabletSized: string
    urlTinySized: string
  } | null
}

const listingPost = gql`
  fragment listingPostFragment on Post {
    slug
    style
    name
    heroImage {
      urlOriginal
      urlDesktopSized
      urlTabletSized
      urlMobileSized
      urlTinySized
    }
  }
`

export { listingPost }
