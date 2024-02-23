import { PostByTagName } from '~/graphql/query/posts'
import type { HeroImage } from '~/graphql/query/topic'
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

function formateHeroImage(heroImage: HeroImage) {
  const images: {
    [key: string]: string
  } = {}

  images.w3200 = heroImage?.urlOriginal ?? ''
  images.w2400 = heroImage.urlDesktopSized ?? ''
  images.w1600 = heroImage?.urlTabletSized ?? ''
  images.w400 = heroImage?.urlMobileSized ?? ''

  return images
}

export { formateHeroImage, formatePostImage }
