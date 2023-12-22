import Link from 'next/link'
import type { Category } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'

type HeaderNavProps = {
  categories: Category[]
  shows: Show[]
}

export default function HeaderNav({ categories, shows }: HeaderNavProps) {
  console.log(categories, shows)
  return (
    <>
      <ul>
        <li>
          <Link href="/category/video">影音</Link>
        </li>
      </ul>
    </>
  )
}
