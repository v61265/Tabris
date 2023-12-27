import type { Category } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'
import styles from './header-nav.module.css'
import NavItems from './nav-items'

type HeaderNavProps = {
  categories: Category[]
  shows: Show[]
}

export default function HeaderNav({ categories, shows }: HeaderNavProps) {
  console.log(categories, shows)
  return (
    <ul className={styles.ul}>
      <NavItems categories={categories} />
    </ul>
  )
}
