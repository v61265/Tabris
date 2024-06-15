import React from 'react'
import Image from 'next/image'

type SearchNoResultProps = {
  width: number
  height: number
}
const SearchNoResult = ({ width, height }: SearchNoResultProps) => {
  return (
    <div>
      <Image
        src="/images/tv-man.svg"
        alt="查無結果"
        width={width}
        height={height}
      />
    </div>
  )
}

export default SearchNoResult
