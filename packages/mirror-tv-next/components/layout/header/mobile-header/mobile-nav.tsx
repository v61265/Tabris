import type { Category } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'
import type { Sponsor } from '~/graphql/query/sponsors'

type MobileNavProps = {
  categories: Category[]
  shows: Show[]
  sponsors: Sponsor[]
}

export default function MobileNav({
  categories,
  shows,
  sponsors,
}: MobileNavProps) {
  console.log(categories, shows, sponsors)
  return <div>MobileNav</div>
}
