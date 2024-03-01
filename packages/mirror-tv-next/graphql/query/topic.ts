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

export type HeroImage = {
  urlDesktopSized: string
  urlTabletSized: string
  urlMobileSized: string
  urlOriginal: string
}

type HeroVideo = {
  url: string
}

export type Slideshow = {
  id: string
  slug: string
  name: string
  heroImage: HeroImage
}

export type Multivideo = {
  id: string
  youtubeUrl: string
  url: string
}

type Category = {
  name: string
}

export type Post = {
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

const fetchSingleTopicByTopicSlug = gql`
  query ($topicSlug: String!, $withCount: Boolean = true) {
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
        url
      }
      meta: _postMeta(where: { state: published }) @include(if: $withCount) {
        count
      }
    }
  }
`

const fetchPostItemsByTopicSlug = gql`
  query (
    $topicSlug: String!
    $first: Int = 12
    $skip: Int
    $postDir: [SortPostsBy!] = publishTime_DESC
  ) {
    topic: allTopics(where: { state: published, slug: $topicSlug }) {
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
    }
  }
`

export { fetchPostItemsByTopicSlug, fetchSingleTopicByTopicSlug, getTopics }
