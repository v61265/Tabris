'use client'
import dynamic from 'next/dynamic'
const GPTAd = dynamic(() => import('~/components/ads/gpt/gpt-ad'))
import { GPTPlaceholderDesktop } from '~/components/ads/gpt/gpt-placeholder'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GPTPlaceholderDesktop>
        <p>廣告 in template</p>
        <GPTAd pageKey="all" adKey="PC_HD" />
      </GPTPlaceholderDesktop>
      {children}
    </>
  )
}
