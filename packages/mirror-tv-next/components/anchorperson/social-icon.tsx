import Image from 'next/image'
import Link from 'next/link'
import styles from '~/styles/components/anchorperson/social-icon.module.scss'

type Props = {
  href: string
  src: string
  alt: string
  name: string
}

export default function SocialIcon({ href, src, alt, name }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`anchor__info-link--${name} ${styles.link}`}
    >
      <Image src={src} alt={alt} width={20} height={20} />
    </Link>
  )
}
