import type { Post } from '~/graphql/query/topic'

type Props = {
  item: Post
}

export default function UiPostCard({ item }: Props) {
  return (
    <>
      <div> {item.title} </div>
    </>
  )
}
