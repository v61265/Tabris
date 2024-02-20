import { PostCardItem } from '~/graphql/query/posts'
import { Topic } from '~/graphql/query/topic'

type Post = PostCardItem

export type PostImage = {
  original: string
  w3200?: string
  w2400?: string
  w1600?: string
  w800?: string
  w400?: string
}

function formatePostImage(post: Post | Topic): PostImage {
  const images: PostImage = {
    original: '/images/image-default.jpg',
  }

  if (!post) {
    return images
  }

  const { heroImage } = post

  images.w3200 = heroImage?.urlOriginal ?? ''
  images.w1600 = heroImage?.urlTabletSized ?? ''
  images.w400 = heroImage?.urlMobileSized ?? ''

  if (heroImage && 'urlDesktopSized' in heroImage) {
    images.w2400 = heroImage?.urlDesktopSized ?? ''
  }

  if (heroImage && 'urlTinySized' in heroImage) {
    images.w2400 = heroImage?.urlTinySized ?? ''
  }

  return images
}

export { formatePostImage }
