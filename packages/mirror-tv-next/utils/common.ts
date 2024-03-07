function isServer(): boolean {
  return typeof window === 'undefined'
}

// Extract YouTube video ID from URL
const extractYoutubeId = (url: string) => {
  const match = url?.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

function handleMetaDesc(str: string) {
  if (!str || typeof str !== 'string') {
    return ''
  }
  // remove html tags and set length limit for meta descripton
  const pureStr = str?.replace(/<[^>]*>?/gm, '')
  const formatedStr = pureStr?.slice(0, 124) ?? ''
  return formatedStr.length > 123 ? formatedStr + '...' : formatedStr
}

export { extractYoutubeId, handleMetaDesc, isServer }
