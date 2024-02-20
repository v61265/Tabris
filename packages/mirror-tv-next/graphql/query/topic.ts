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

type HeroImage = {
  urlDesktopSized: string
  urlTabletSized: string
  urlMobileSized: string
  urlOriginal: string
}

type HeroVideo = {
  url: string
}

type Slideshow = {
  id: string
  slug: string
  name: string
  heroImage: HeroImage
}

type Multivideo = {
  id: string
  youtubeUrl: string
}

type Category = {
  name: string
}

type Post = {
  id: string
  slug: string
  title: string
  publishTime: string
  heroImage: {
    urlMobileSized: string
    urlTabletSized: string
  }
  categories: Category[]
}

export type SingleTopic = {
  id: string
  title: string
  sortDir: string
  leading: string
  facebook: string
  briefHtml: string
  instagram: string
  line: string
  heroImage: HeroImage
  heroVideo: HeroVideo
  slideshow: Slideshow[]
  multivideo: Multivideo[]
  items: Post[]
  meta: {
    count: number
  }
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

const fetchPostsByTopicSlug = gql`
  query (
    $topicSlug: String!
    $first: Int = 12
    $skip: Int
    $withCount: Boolean = true
    $postDir: [SortPostsBy!] = publishTime_DESC
  ) {
    topic: allTopics(where: { state: published, slug: $topicSlug }) {
      id
      title: name
      sortDir
      leading
      facebook
      briefHtml
      instagram
      line
      heroImage {
        urlDesktopSized
        urlTabletSized
        urlMobileSized
        urlOriginal
      }
      heroVideo {
        url
      }
      slideshow {
        id
        slug
        name
        heroImage {
          urlTabletSized
          urlDesktopSized
          urlMobileSized
          urlOriginal
        }
      }
      multivideo {
        id
        youtubeUrl
      }
      items: post(
        where: { state: published }
        first: $first
        skip: $skip
        sortBy: $postDir
      ) {
        id
        slug
        title: name
        publishTime
        heroImage {
          urlMobileSized
          urlTabletSized
        }
        categories {
          name
        }
      }
      meta: _postMeta(where: { state: published }) @include(if: $withCount) {
        count
      }
    }
  }
`

const fetchPostSortDirBySlug = gql`
  query ($topicSlug: String!) {
    topic: allTopics(where: { state: published, slug: $topicSlug }) {
      sortDir
    }
  }
`

export { fetchPostSortDirBySlug, fetchPostsByTopicSlug, getTopics }
