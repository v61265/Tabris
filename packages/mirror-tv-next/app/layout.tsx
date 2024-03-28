import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import Footer from '~/components/layout/footer'
import MainHeader from '~/components/layout/header/main-header'
import { META_DESCRIPTION, SITE_TITLE } from '~/constants/constant'
import { GLOBAL_CACHE_SETTING, GTM_ID } from '~/constants/environment-variables'
import '../styles/global.css'

export const revalidate = GLOBAL_CACHE_SETTING

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
      <GoogleTagManager gtmId={GTM_ID} />
      <body>
        <>
          <MainHeader />
          {children}
          <Footer />
        </>
      </body>
    </html>
  )
}
