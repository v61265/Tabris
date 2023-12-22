import { HttpLink } from '@apollo/client'

import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { API_ENDPOINT } from './constants/config'

// reference: https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13
// @apollo/experimental-nextjs-app-support makes sure that we only instance the Apollo Client once per request,
// since Apollo Client’s cache is designed with a single user in mind, we recommend that your Next.js server instantiates a new cache for each SSR request, rather than reusing the same long-lived instance for multiple users’ data.

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: API_ENDPOINT,
    }),
  })
})
