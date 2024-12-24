import { External } from '~/graphql/query/externals'
import { formateHeroImage } from './image-handler'
import type { PostCardItem, PostWithCategory } from '~/graphql/query/posts'
import { FeaturePost } from '~/types/api-data'
import type { PostImage } from '~/utils/image-handler'

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

const formatArticleCard = (
  post:
    | PostCardItem
    | FeaturePost
    | PostWithCategory
    | External
    | FormattedPostCard,
  options?: { label?: string | undefined }
): FormattedPostCard => {
  const imageObj =
    'heroImage' in post
      ? post.heroImage
      : 'ogImage' in post
      ? post.ogImage ?? {}
      : (post as External).thumbnail
      ? { urlOriginal: (post as External).thumbnail }
      : {}
  const typeName = '__typename' in post ? String(post['__typename'] ?? '') : ''
  return {
    href:
      typeName === 'External'
        ? `/external/${post.slug}`
        : `/story/${post.slug}`,
    slug: post.slug,
    style: 'style' in post ? post.style : 'article',
    name: post.name,
    images: formateHeroImage(imageObj ?? {}),
    publishTime: new Date(post.publishTime),
    label:
      options?.label ||
      (post as FeaturePost | PostWithCategory).categories?.[0]?.name,
    __typeName: typeName,
  }
}

export { formatArticleCard }
