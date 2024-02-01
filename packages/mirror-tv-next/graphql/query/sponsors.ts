import gql from 'graphql-tag'

export type Sponsor = {
  id: string
  title: string
  url: string
  logo: {
    urlMobileSized: string
  }
  mobile: {
    urlMobileSized: string
  }
  tablet: {
    urlMobileSized: string
  }
  topic: {
    id: string
    slug: string
    name: string
  }
}

const fetchSponsors = gql`
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
export { fetchSponsors }
