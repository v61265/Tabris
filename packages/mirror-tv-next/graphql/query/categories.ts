import gql from 'graphql-tag'

const categories = gql`
  query {
    allCategories(
      where: { isFeatured: true }
      sortBy: [sortOrder_ASC, createdAt_DESC]
    ) {
      name
      slug
      sortOrder
      id
    }
  }
`
export { categories }
