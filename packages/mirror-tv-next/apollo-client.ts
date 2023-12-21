import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { isServer } from '~/utils/common'
import { API_ENDPOINT } from './constants/config'

let client: ApolloClient<any> | null = null

export const getClient = () => {
  // creat a new client if there's no existing one
  // or if we are running on the server.
  if (!client || isServer()) {
    client = new ApolloClient({
      link: new HttpLink({
        uri: API_ENDPOINT,
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
    })
  }
  return client
}
