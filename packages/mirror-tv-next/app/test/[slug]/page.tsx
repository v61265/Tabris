import Link from 'next/link'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'

export const revalidate = GLOBAL_CACHE_SETTING

export default function StoryPage({ params }: { params: { slug: string } }) {
  const mockStringArr = ['a', 'b', 'c']
  return (
    <section>
      stroy: {params.slug}
      <br />
      {mockStringArr.map((item, index) => (
        <Link key={index} href={`/test/${item}`}>
          {item}
        </Link>
      ))}
    </section>
  )
}
