import { External } from '~/graphql/query/externals'
import { formateHeroImage } from './image-handler'
import type { PostCardItem, PostWithCategory } from '~/graphql/query/posts'
import { FeaturePost } from '~/types/api-data'
import type { PostImage } from '~/utils/image-handler'
import { type HeroImage } from '~/types/common'

export type FormattedPostCard = {
  href: string
  slug: string
  style?: string
  name: string
  images: PostImage
  publishTime: Date
  label?: string
  __typeName?: string
}

type FormatArticleCardInput = {
  slug: string
  name: string
  publishTime: string | Date
  heroImage?: HeroImage | null
  ogImage?: HeroImage | null
  thumbnail?: string | null
  style?: string
  categories?: { name: string }[]
  __typename?: string
}

const formatArticleCard = (
  post:
    | PostCardItem
    | FeaturePost
    | PostWithCategory
    | External
    | FormattedPostCard,
  options?: { label?: string }
): FormattedPostCard => {
  const postFormatArticleCardInput: FormatArticleCardInput = {
    slug: post.slug,
    name: post.name,
    publishTime: post.publishTime,
    heroImage: 'heroImage' in post ? post.heroImage : null,
    ogImage: 'ogImage' in post ? post.ogImage : null,
    thumbnail: 'thumbnail' in post ? post.thumbnail : null,
    style: 'style' in post ? post.style : undefined,
    categories: 'categories' in post ? post.categories : undefined,
    __typename:
      '__typename' in post ? String(post['__typename'] ?? '') : undefined,
  }
  const imageObj =
    postFormatArticleCardInput.heroImage ??
    postFormatArticleCardInput.ogImage ??
    (postFormatArticleCardInput.thumbnail
      ? { urlOriginal: postFormatArticleCardInput.thumbnail }
      : {})
  return {
    href:
      postFormatArticleCardInput.__typename === 'External'
        ? `/external/${post.slug}`
        : `/story/${post.slug}`,
    slug: postFormatArticleCardInput.slug,
    style: postFormatArticleCardInput.style ?? 'article',
    name: postFormatArticleCardInput.name,
    images: formateHeroImage(imageObj),
    publishTime: new Date(postFormatArticleCardInput.publishTime),
    label: options?.label || postFormatArticleCardInput.categories?.[0]?.name,
    __typeName: postFormatArticleCardInput.__typename ?? '',
  }
}

export { formatArticleCard }
