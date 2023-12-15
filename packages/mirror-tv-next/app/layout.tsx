import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '鏡新聞',
  description:
    '鏡電視股份有限公司創立「鏡新聞」，以多元、專業、深度、國際、藝文、弱勢為特色，期待提供給大家耳目一新的優質新聞內容，也歡迎閱聽人隨時給我們建議。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ch">
      <body>{children}</body>
    </html>
  )
}
