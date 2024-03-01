import gql from 'graphql-tag'

export type Category = {
  id?: string
  name: string
  slug: string
}

const fetchCategoryBySlug = gql`
  query fetchCategoryBySlug($slug: String!) {
    allCategories(where: { slug: $slug }) {
      name
      slug
    }
  }
`

export { fetchCategoryBySlug }
