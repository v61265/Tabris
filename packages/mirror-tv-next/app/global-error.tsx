// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
// global-error.js is only enabled in production. In development, next.js error overlay will show instead.
// Unlike the root error.js, the global-error.js error boundary wraps the entire application, and its fallback component replaces the root layout when active. Because of this, it is important to note that global-error.js must define its own <html> and <body> tags.

'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Ui404 from '~/components/errors/ui-404'
import Ui500 from '~/components/errors/ui-500'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div>{error.message === 'NEXT_NOT_FOUND' ? <Ui404 /> : <Ui500 />}</div>
      </body>
    </html>
  )
}
