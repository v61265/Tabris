import Image from 'next/image'
import styles from '~/styles/components/ombuds/hero-img.module.scss'

export default function HeroImg() {
  return (
    <section className={styles.imageWrapper}>
      <Image src="/images/om-banner.jpg" alt="hero-image" fill />
    </section>
  )
}
