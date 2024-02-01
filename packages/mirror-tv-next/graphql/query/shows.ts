import gql from 'graphql-tag'

export type Show = {
  id: string
  slug: string
  name: string
  sortOrder: number
  bannerImg: {
    urlMobileSized: string
    urlTabletSized: string
    urlOriginal: string
  }
}

const fetchShows = gql`
  query {
    allShows(sortBy: [sortOrder_ASC, createdAt_DESC]) {
      id
      slug
      name
      sortOrder
      bannerImg {
        urlMobileSized
        urlTabletSized
        urlOriginal
      }
    }
  }
`
export { fetchShows }
