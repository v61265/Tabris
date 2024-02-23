'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { HeroImage } from '~/graphql/query/topic'
import styles from '~/styles/components/topic/single-topic/hero-image.module.scss'

type HeroImageProps = {
  heroImage: HeroImage
  title: string
}

export default function HeroImage({ heroImage, title }: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <section className={styles.sectionWrapper}>
      {isLoading && (
        <div className={styles.loading}>
          <Image
            src="/images/loading.svg"
            alt="Loading"
            width={200}
            height={200}
          />
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
        alt={title}
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
