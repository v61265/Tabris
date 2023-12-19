import Image from 'next/image'
import Link from 'next/link'
import logoSrc from '~/public/icons/mnews-logo.svg'

export default function MainHeader(): JSX.Element {
  return (
    <header>
      <Link href="/">
        <Image src={logoSrc} alt="mnews logo" priority />
      </Link>
      <p>Hi header</p>
    </header>
  )
}
