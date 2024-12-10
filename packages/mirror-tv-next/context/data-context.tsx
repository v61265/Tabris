'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { PostCardItem } from '~/graphql/query/posts'
import type { RawPopularPost } from '~/types/popular-post'

type DataContextType = {
  popularPosts: RawPopularPost[]
  setPopularPosts: (posts: RawPopularPost[]) => void
  latestPosts: PostCardItem[]
  setLatestPosts: (posts: PostCardItem[]) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({
  children,
  initialPopularPosts,
  initialLatestPosts,
}: {
  children: ReactNode
  initialPopularPosts: RawPopularPost[]
  initialLatestPosts: PostCardItem[]
}) {
  const [popularPosts, setPopularPosts] =
    useState<RawPopularPost[]>(initialPopularPosts)
  const [latestPosts, setLatestPosts] = useState(initialLatestPosts)

  return (
    <DataContext.Provider
      value={{ popularPosts, setPopularPosts, latestPosts, setLatestPosts }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
