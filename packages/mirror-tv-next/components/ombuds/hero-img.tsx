'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from '~/styles/components/ombuds/hero-img.module.scss'

export default function HeroImg() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <section className={styles.imageWrapper}>
      {isLoading && (
        <Image
          src={'/images/loading.svg'}
          style={{ objectFit: 'contain' }}
          alt="loading-image"
          fill
        />
      )}
      {!hasError ? (
        <Image
          src={'/images/om-banner.jpg'}
          style={{ objectFit: 'contain' }}
          alt="ombuds-banner"
          fill
          onLoad={handleLoadComplete}
          onError={handleImageError}
        />
      ) : (
        <Image
          src={'/images/image-default.jpg'}
          style={{ objectFit: 'cover' }}
          alt="default-image"
          fill
        />
      )}
    </section>
  )
}
