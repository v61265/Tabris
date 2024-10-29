'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import type { RawPopularPost } from '~/types/popular-post'

type DataContextType = {
  popularPosts: RawPopularPost[]
  setPopularPosts: (posts: RawPopularPost[]) => void
}

const ThemeContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({
  children,
  initialPopularPosts,
}: {
  children: ReactNode
  initialPopularPosts: RawPopularPost[]
}) {
  const [popularPosts, setPopularPosts] =
    useState<RawPopularPost[]>(initialPopularPosts)

  return (
    <ThemeContext.Provider value={{ popularPosts, setPopularPosts }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a DataProvider')
  }
  return context
}
