'use client'
import React, { createContext, useContext } from 'react'
import {
  GLOBAL_CACHE_SETTING,
  HEADER_JSON_URL,
} from '~/constants/environment-variables'
import errors from '@twreporter/errors'
import type { HeaderData } from '~/types/header'

interface AppContextType {
  data: HeaderData
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  let data: HeaderData = {
    allSponsors: [],
    allCategories: [],
    allShows: [],
  }
  try {
    const res = await fetch(HEADER_JSON_URL, {
      next: { revalidate: GLOBAL_CACHE_SETTING },
    })
    if (!res.ok) {
      console.error('Failed to fetch header data')
    } else {
      const jsonData = await res.json()
      data = {
        ...data,
        ...jsonData,
      }
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching header data'
    )

    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingError, {
          withStack: false,
          withPayload: true,
        }),
      })
    )
  }

  return <AppContext.Provider value={{ data }}>{children}</AppContext.Provider>
}
