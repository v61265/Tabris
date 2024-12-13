import React from 'react'

type StoryPageTypes = {
  params: { slug: string }
}
const StoryPage: React.FC<StoryPageTypes> = async ({ params }) => {
  return <div>StoryPage slug is : {params.slug}</div>
}

export default StoryPage
