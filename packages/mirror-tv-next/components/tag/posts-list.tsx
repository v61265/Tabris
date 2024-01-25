import { PostByTagName } from '~/graphql/query/posts'
import UiPostCard from '~/components/shared/ui-post-card'
import { formatePostImage } from '~/utils'
import styles from '~/styles/components/tag/posts-list.module.scss'

type UiMoreTagListProps = {
  postsList: PostByTagName[]
  keyName: string
}

export default function PostsList({ postsList, keyName }: UiMoreTagListProps) {
  const formatArticleCard = (post: PostByTagName) => {
    return {
      href: `/story/${post.slug}`,
      slug: post.slug,
      style: post.style,
      name: post.name,
      images: formatePostImage(post),
      publishTime: new Date(post.publishTime),
    }
  }

  const formattedPostsList = postsList.map((post) => formatArticleCard(post))

  return (
    <ol className={styles.posts}>
      {formattedPostsList.map((postItem) => {
        return (
          <li key={keyName + postItem.slug}>
            <UiPostCard
              href={postItem.href}
              images={postItem.images}
              title={postItem.name}
              date={postItem.publishTime}
              postStyle={postItem.style}
              mobileLayoutDirection="column"
            />
          </li>
        )
      })}
    </ol>
  )
}
