import gql from 'graphql-tag'
export interface HeroImage {
  original: string
  tiny: string
  mobile: string
  tablet: string
  desktop: string
  urlOriginal: string
}

export interface HeroVideo {
  youtubeUrl: string
}

export interface Category {
  slug: string
  title: string
}

export interface Contributor {
  name: string
  slug: string
}

export interface Tag {
  name: string
}

export interface RelatedPost {
  slug: string
  name: string
  heroImage: {
    tiny: string
    mobile: string
    tablet: string
    desktop: string
    urlOriginal: string
  }
}

export interface Download {
  id: string
  title: string
  url: string
}

export interface Post {
  style: string
  state: string
  title: string
  brief: string
  briefApiData: string
  contentApiData: string
  publishTime: string // Date in ISO format
  updatedAt: string // Date in ISO format
  source: string
  isAdult: boolean
  heroImage: HeroImage
  heroVideo?: HeroVideo
  heroCaption: string
  categories: Category[]
  writers: Contributor[]
  photographers: Contributor[]
  cameraOperators: Contributor[]
  designers: Contributor[]
  engineers: Contributor[]
  vocals: Contributor[]
  otherbyline: string
  tags: Tag[]
  relatedPosts: RelatedPost[]
  download: Download[]
}

export interface FetchStoryBySlugResponse {
  allPosts: Post[]
}

const fetchStoryBySlug = gql`
  query fetchStoryBySlug($slug: String!) {
    allPosts(where: { slug: $slug, state_not_in: invisible }) {
      relatedPosts(where: { state: published }) {
        slug
        name
      }
    }
  }
`

export { fetchStoryBySlug }
