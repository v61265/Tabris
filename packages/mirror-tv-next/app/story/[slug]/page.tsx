import React from 'react'

type StoryPageTypes = {
  params: { slug: string }
}
const StoryPage = async ({ params }: StoryPageTypes) => {
  return <div>StoryPage slug is : {params.slug}</div>
}

export default StoryPage
