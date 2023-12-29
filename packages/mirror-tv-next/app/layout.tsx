import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import MainHeader from '~/components/layout/header/main-header'
import { META_DESCRIPTION, SITE_TITLE } from '~/constants/constant'
import StyledComponentsRegistry from '~/styled-components-registry'
import '../styles/global.css'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: META_DESCRIPTION,
}

const noto_sans = Noto_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ch" className={`${noto_sans.variable} ${noto_sans.variable}`}>
      <body>
        <>
          <MainHeader />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </>
      </body>
    </html>
  )
}
