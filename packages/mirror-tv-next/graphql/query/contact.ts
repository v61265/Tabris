import gql from 'graphql-tag'

const fetchContactBySlug = gql`
  query ($slug: String!, $shouldFetchRelatedShows: Boolean = false) {
    allContacts(where: { slug: $slug }) {
      name
      facebook
      instagram
      twitter
      bioApiData
      showhostImg {
        urlMobileSized
        urlTabletSized
        urlDesktopSized
      }
      relatedShows @include(if: $shouldFetchRelatedShows) {
        slug
        name
        isArtShow
      }
    }
  }
`
const fetchContactsByAnchorPerson = gql`
  query {
    allContacts(
      where: { anchorperson: true }
      sortBy: [sortOrder_ASC, updatedAt_DESC]
    ) {
      name
      slug
      anchorImg {
        urlTabletSized
        urlMobileSized
      }
    }
  }
`

const fetchContactsByHost = gql`
  query {
    allContacts(
      where: { host: true }
      sortBy: [sortOrder_ASC, updatedAt_DESC]
    ) {
      name
      slug
      anchorImg {
        urlTabletSized
        urlMobileSized
      }
    }
  }
`

export { fetchContactBySlug, fetchContactsByAnchorPerson, fetchContactsByHost }
