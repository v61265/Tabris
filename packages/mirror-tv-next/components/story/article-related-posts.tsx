import React from 'react'
import UiHeadingBordered from '../shared/ui-heading-bordered'
import { Post } from '~/graphql/query/story'

import styles from './_styles/article-related-posts.module.scss'

const ArticleRelatedPosts = ({
  relatedPosts,
}: {
  relatedPosts: Post['relatedPosts']
}) => {
  return (
    <div className={styles.container}>
      <UiHeadingBordered title={'更多新聞'} className={styles.listTitle} />
      <ul>
        {relatedPosts.map((item, idx) => (
          <li key={item.slug + idx}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ArticleRelatedPosts
