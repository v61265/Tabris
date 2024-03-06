import errors from '@twreporter/errors'

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

const handleResponse = <
  T extends Record<string, unknown>,
  U extends PromiseSettledResult<T>,
  V
>(
  response: U,
  callback: (value: T | undefined) => V
): V => {
  if (response.status === 'fulfilled') {
    return callback(response.value)
  } else if (response.status === 'rejected') {
    const { graphQLErrors, clientErrors, networkError } = response.reason
    const annotatingError = errors.helpers.wrap(
      response.reason,
      'UnhandledError',
      'Error occurs while fetching category data in category page'
    )

    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          annotatingError,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
        debugPayload: {
          graphQLErrors,
          clientErrors,
          networkError,
        },
      })
    )
  }
  return callback(undefined)
}

export { extractYoutubeId, isServer, handleResponse }
