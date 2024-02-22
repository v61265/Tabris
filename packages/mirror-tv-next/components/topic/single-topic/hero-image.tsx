'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { HeroImage } from '~/graphql/query/topic'
import styles from '~/styles/components/topic/single-topic/hero-image.module.scss'

type HeroImageProps = {
  heroImage: HeroImage
  alt: string
}

export default function HeroImage({ heroImage, alt }: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <section className={styles.sectionWrapper}>
      {isLoading && (
        <div className={styles.loading}>
          <img src="/images/loading.svg" alt="Loading" />
        </div>
      )}
      <Image
        src={
          heroImage?.urlDesktopSized ||
          heroImage?.urlTabletSized ||
          heroImage?.urlMobileSized ||
          heroImage?.urlOriginal ||
          '/images/image-default.jpg'
        }
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        onLoad={handleImageLoad}
        priority
      />
    </section>
  )
}
