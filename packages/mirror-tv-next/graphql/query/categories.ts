import gql from 'graphql-tag'

export type Category = {
  name: string
  slug: string
  sortOrder: number
  id: string
}

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
