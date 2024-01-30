'use client'
import { PostImage } from '~/utils'
import Image from '@readr-media/react-image'

type UiPostCardProps = {
  images: PostImage
  alt: string
  priority: boolean
  rwd?: {
    mobile?: string
    tablet?: string
    laptop?: string
    desktop?: string
    default?: string
  }
}

export default function ResponsiveImage({
  images,
  alt = '',
  priority = true,
  rwd = {
    mobile: '100vw',
    tablet: '100vw',
    laptop: '100vw',
    desktop: '100vw',
    default: '100vw',
  },
}: UiPostCardProps) {
  return (
    <Image
      images={images}
      alt={alt}
      loadingImage="/images/loading.svg"
      defaultImage="/images/image-default.jpg"
      rwd={rwd}
      priority={priority}
    />
  )
}
