import gql from 'graphql-tag'

export type Video = {
  id: string
  youtubeUrl: string
  url: string
}

const getVideoByName = gql`
  query fetchVideoByName($name: String!, $take: Int) {
    allVideos(where: { name: $name, state: published }, first: $take) {
      id
      youtubeUrl
      url
    }
  }
`

export { getVideoByName }
