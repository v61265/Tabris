import type { Metadata } from 'next'
import MainHeader from '~/components/layout/header/main-header'
import { META_DESCRIPTION, SITE_TITLE } from '~/constants/constant'
import './global.css'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: META_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ch">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  )
}
