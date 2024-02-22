import { ENV, SITE_URL } from '~/constants/environment-variables'

function isServer(): boolean {
  return typeof window === 'undefined'
}

function getGcsJsonUrl(fileName: string): string {
  return ENV === 'local'
    ? `https://dev.mnews.tw/json/${fileName}.json`
    : `https://${SITE_URL}/json/${fileName}.json`
}

export { isServer, getGcsJsonUrl }
