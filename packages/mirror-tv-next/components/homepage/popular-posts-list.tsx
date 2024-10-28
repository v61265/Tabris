'use client'
import { useTheme } from '~/context/data-context'
// import styles from './_styles/popular-posts-list.module.scss'
import { useEffect } from 'react'

export default function PopularPostsList() {
  const { popularPosts } = useTheme()

  useEffect(() => {
    console.log(popularPosts)
  }, [popularPosts])

  return <section></section>
}
