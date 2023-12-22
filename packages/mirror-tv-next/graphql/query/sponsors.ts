import gql from 'graphql-tag'

const sponsors = gql`
  query {
    allSponsors(
      where: { state: published }
      sortBy: [sortOrder_ASC, createdAt_DESC]
    ) {
      id
      title
      url
      logo {
        urlMobileSized
      }
      mobile {
        urlMobileSized
      }
      tablet {
        urlMobileSized
      }
      topic {
        id
        slug
        name
      }
    }
  }
`
export { sponsors }
