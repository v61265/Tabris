import type { Show } from '~/graphql/query/shows'
import UiShowCard from './ui-show-card'
import UiHeadingBordered from '~/components/shared/ui-heading-bordered'
import styles from '~/styles/components/category/video/ui-show-cards-list.module.scss'

type UiShowsListProps = {
  title: string
  showsList: Show[]
}

export default function UiShowsList({ showsList, title }: UiShowsListProps) {
  return (
    <>
      <UiHeadingBordered title={title} htmlTag="h2" />
      <ul className={styles.list}>
        {showsList.map((showItem) => {
          return (
            <UiShowCard
              key={showItem.slug}
              slug={showItem.slug}
              name={showItem.name}
              bannerImg={showItem.bannerImg ?? {}}
              isArtShow={showItem.isArtShow ?? false}
            />
          )
        })}
      </ul>
    </>
  )
}
