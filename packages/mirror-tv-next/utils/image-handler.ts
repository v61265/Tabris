import { PostByTagName } from '~/graphql/query/posts'
import { Topic } from '~/graphql/query/topic'

type Post = PostByTagName

export type PostImage = {
  original: string
  w3200?: string
  w2400?: string
  w1600?: string
  w800?: string
  w400?: string
}

function formatePostImage(post: Post | Topic): PostImage {
  const defaultImage: PostImage = {
    original: '/images/image-default.jpg',
  }

  if (!post) {
    return defaultImage
  }

  const { heroImage } = post

  return {
    original: defaultImage.original,
    w3200: heroImage?.urlOriginal || defaultImage.w3200,
    w2400: heroImage?.urlDesktopSized || defaultImage.w2400,
    w1600: heroImage?.urlTabletSized || defaultImage.w1600,
    w800: heroImage?.urlMobileSized || defaultImage.w800,
    w400: heroImage?.urlTinySized || defaultImage.w400,
  }
}

export { formatePostImage }
