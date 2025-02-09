'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Ui404 from '~/components/errors/ui-404'
import Ui500 from '~/components/errors/ui-500'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return <div>{error.digest === 'NEXT_NOT_FOUND' ? <Ui404 /> : <Ui500 />}</div>
}
