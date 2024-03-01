import styles from '~/styles/components/shared/ui-list-posts-aside.module.scss'
import { FormattedPostCard } from '~/utils'
import UiHeadingBordered from './ui-heading-bordered'
import UiPostCardAside from './ui-post-card-aside'

type UiListPostsAsideProps = {
  listTitle: string
  listData: FormattedPostCard[]
  page: 'category' | 'stroy' // 目前這兩個頁面會用共基本部分，但有些細微樣式不同
}

export default function UiListPostsAside({
  listTitle,
  listData,
  page,
}: UiListPostsAsideProps) {
  return (
    <div
      className={[
        styles.wrapper,
        page === 'category' ? styles.bordered : '',
      ].join(' ')}
    >
      <UiHeadingBordered title={listTitle} className={styles.listTitle} />
      <ol
        className={[
          styles.list,
          page === 'category' ? styles.listBordered : '',
        ].join(' ')}
      >
        {listData?.map((item) => {
          return (
            <li
              key={`list-article-aside-${item.slug}`}
              className={['list__list-item', styles.item].join(' ')}
            >
              <UiPostCardAside
                href={item.href}
                images={item.images}
                title={item.name}
                page={page}
                postStyle={item.style ?? ''}
                date={item.publishTime}
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}
