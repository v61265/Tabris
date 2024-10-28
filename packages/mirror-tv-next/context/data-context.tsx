'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { RawPopularPost } from '~/types/popular-post'

type ThemeContextType = {
  popularPosts: RawPopularPost[]
  setPopularPosts: (posts: RawPopularPost[]) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
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

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
