import type { Category } from '~/graphql/query/category'
import type { Show } from '~/graphql/query/shows'
import styles from './_styles/header-nav.module.scss'
import NavItems from './nav-items'

type HeaderNavProps = {
  categories: Category[]
  shows: Show[]
}

export default function HeaderNav({ categories, shows }: HeaderNavProps) {
  return (
    <ul className={styles.ul}>
      <NavItems categories={categories} shows={shows} />
    </ul>
  )
}
