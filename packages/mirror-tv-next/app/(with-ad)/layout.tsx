import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'
import '~/styles/global.css'
import dynamic from 'next/dynamic'
const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))
import { GPTPlaceholderDesktop } from '~/components/ads/gpt/gpt-placeholder'

export const revalidate = GLOBAL_CACHE_SETTING

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GPTPlaceholderDesktop>
        <p>廣告</p>
        <GPTAd pageKey="all" adKey="PC_HD" />
      </GPTPlaceholderDesktop>
      {children}
    </>
  )
}
