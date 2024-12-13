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
      style
      state
      title: name
      brief
      briefApiData
      contentApiData
      publishTime
      updatedAt
      source
      isAdult
      heroImage {
        original: urlOriginal
        tiny: urlTinySized
        mobile: urlMobileSized
        tablet: urlTabletSized
        desktop: urlDesktopSized
        urlOriginal
      }
      heroVideo {
        youtubeUrl
      }
      heroCaption
      categories {
        slug
        title: name
      }
      writers {
        name
        slug
      }
      photographers {
        name
        slug
      }
      cameraOperators {
        name
        slug
      }
      designers {
        name
        slug
      }
      engineers {
        name
        slug
      }
      vocals {
        name
        slug
      }
      otherbyline
      tags {
        name
      }
      relatedPosts(where: { state: published }) {
        slug
        name
        heroImage {
          tiny: urlTinySized
          mobile: urlMobileSized
          tablet: urlTabletSized
          desktop: urlDesktopSized
          urlOriginal
        }
      }
      download {
        id
        title: name
        url
      }
    }
  }
`

export { fetchStoryBySlug }
