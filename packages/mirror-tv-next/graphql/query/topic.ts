import gql from 'graphql-tag'

export type Topic = {
  id: string
  slug: string
  name: string
  sortOrder: number
  briefApiData: string
  heroImage: {
    urlMobileSized: string
    urlTabletSized: string
    urlOriginal: string
  } | null
}

const getTopics = gql`
  query fetchTopics($first: Int = 12, $skip: Int, $withCount: Boolean = true) {
    allTopics(
      first: $first
      skip: $skip
      where: { state: published }
      sortBy: [sortOrder_ASC, updatedAt_DESC]
    ) {
      id
      slug
      name
      briefApiData
      heroImage {
        urlMobileSized
        urlTabletSized
        urlOriginal
      }
    }
    _allTopicsMeta(where: { state: published }) @include(if: $withCount) {
      count
    }
  }
`

export { getTopics }
