import { MetadataRoute } from 'next'
import { ENV } from '~/constants/environment-variables'

export default function robots(): MetadataRoute.Robots {
  console.log({ ENV })
  if (ENV !== 'prod') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  }
}
