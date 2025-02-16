import { GA4_ID } from '~/constants/environment-variables'
import styles from '~/components/story/amp/_styles/layout.module.scss'
import { Noto_Sans } from 'next/font/google'
import Head from 'next/head'

export const config = { amp: true }

const noto_sans = Noto_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
})

export default function AMPLayout({ children }: { children: React.ReactNode }) {
  const googleAnalytics4Json = JSON.stringify({
    vars: {
      GA4_MEASUREMENT_ID: GA4_ID,
      GA4_ENDPOINT_HOSTNAME: 'www.google-analytics.com',
      GOOGLE_CONSENT_ENABLED: false,
      WEBVITALS_TRACKING: false,
      PERFORMANCE_TIMING_TRACKING: false,
      DEFAULT_PAGEVIEW_ENABLED: true,
      SEND_DOUBLECLICK_BEACON: false,
      DISABLE_REGIONAL_DATA_COLLECTION: false,
      ENHANCED_MEASUREMENT_SCROLL: false,
    },
  })

  const ampCustomStyles: string = `
  .layout-wrapper {
    body {
      margin: 0;
      padding: 0;
    }
  }
  
  .layout-header {
    background-color: #036;
    padding: 12px;
    display: flex;
    justify-content: center;
}
  `

  return (
    <html lang="zh-Hant" className={`${noto_sans.variable} layout-wrapper`}>
      <Head>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style
          amp-custom
          dangerouslySetInnerHTML={{ __html: ampCustomStyles }}
        />
      </Head>
      <body>
        <amp-analytics
          type="googleanalytics"
          config="https://amp.analytics-debugger.com/ga4.json"
          data-credentials="include"
        >
          <script
            type="application/json"
            dangerouslySetInnerHTML={{ __html: googleAnalytics4Json }}
          ></script>
        </amp-analytics>
        <header className="layout-header">
          <a href="/">
            <amp-img
              width="183"
              height="34"
              src="/icons/mnews-logo-white.svg"
              alt="mnews homepage"
              layout="intrinsic"
            />
          </a>
        </header>
        {children}
      </body>
    </html>
  )
}
