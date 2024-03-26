import Image from 'next/image'
import Link from 'next/link'

type Props = {
  href: string
  src: string
  alt: string
}

export default function SocialIcon({ href, src, alt }: Props) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Image src={src} alt={alt} width={20} height={20} />
    </Link>
  )
}
