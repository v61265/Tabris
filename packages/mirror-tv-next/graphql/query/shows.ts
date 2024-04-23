import gql from 'graphql-tag'

export type Show = {
  id: string
  slug: string
  name: string
  sortOrder: number
  isArtShow: boolean | null
  bannerImg: {
    urlMobileSized: string
    urlTabletSized: string
    urlOriginal: string
  } | null
}

const fetchShows = gql`
  query fetchShows {
    allShows(sortBy: [sortOrder_ASC, createdAt_DESC]) {
      id
      slug
      name
      isArtShow
      bannerImg {
        urlMobileSized
        urlTabletSized
        urlOriginal
      }
    }
  }
`
export { fetchShows }
