'use client'
import React, { useEffect } from 'react'

interface FacebookPagePluginProps {
  href: string
  pageName?: string
}

const FacebookPagePlugin: React.FC<FacebookPagePluginProps> = ({
  href = 'https://www.facebook.com/mnewstw/',
  pageName = '鏡新聞',
}) => {
  useEffect(() => {
    const insertRootDiv = () => {
      if (!document.getElementById('fb-root')) {
        const rootDiv = document.createElement('div')
        rootDiv.id = 'fb-root'
        document.body.appendChild(rootDiv)
      }
    }

    const insertSDK = () => {
      if (!document.getElementById('fb-sdk')) {
        const script = document.createElement('script')
        script.id = 'fb-sdk'
        script.src =
          'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v8.0'
        script.crossOrigin = 'anonymous'
        document.body.appendChild(script)
      }
    }

    if (window.FB) {
      setTimeout(() => window.FB.XFBML.parse(), 0)
    } else {
      insertRootDiv()
      insertSDK()
    }
  }, [])

  return (
    <div
      className="fb-page"
      data-href={href}
      data-tabs=""
      data-width="500px"
      data-height="162px"
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="false"
      hide_cta="true"
    >
      <blockquote cite={href} className="fb-xfbml-parse-ignore">
        <a href={href}>{pageName}</a>
      </blockquote>
    </div>
  )
}

export default FacebookPagePlugin
