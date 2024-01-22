import { PostByTagName } from '~/graphql/query/posts'

type Post = PostByTagName

export type PostImage = {
  original: string
  w3200?: string
  w2400?: string
  w1600?: string
  w800?: string
  w400?: string
}

function formatePostImage(post: Post): PostImage {
  const defaultImage: PostImage = {
    original: '/images/image-default.jpg',
  }

  if (!post) {
    return defaultImage
  }

  const {
    urlDesktopSized,
    urlTabletSized,
    urlMobileSized,
    urlTinySized,
    urlOriginal,
  } = post.heroImage || {}

  return {
    original: defaultImage.original,
    w3200: urlOriginal || defaultImage.w3200,
    w2400: urlDesktopSized || defaultImage.w2400,
    w1600: urlTabletSized || defaultImage.w1600,
    w800: urlMobileSized || defaultImage.w800,
    w400: urlTinySized || defaultImage.w400,
  }
}

export { formatePostImage }
