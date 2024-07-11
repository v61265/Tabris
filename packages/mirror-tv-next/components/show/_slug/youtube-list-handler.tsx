'use client'
// import useWindowDimensions from '~/hooks/use-window-dimensions'
import YoutubeList from './youtube-list'
import type { FormatPlayListItems } from './youtube-list'
// import { useMemo } from 'react'

type YoutubeListHandlerProps = {
  playLists: FormatPlayListItems[]
}

export default function YoutubeListHandler({
  playLists = [],
}: YoutubeListHandlerProps) {
  // const { width } = useWindowDimensions()
  // const isMobile = useMemo(() => {
  //   width && width < 768
  // }, [width])

  return (
    <>
      {playLists.map((list, index) => (
        <YoutubeList key={index} playListObj={list} />
      ))}
    </>
  )
}
