import styles from '~/styles/components/shared/ui-load-more-button.module.scss'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'

export const revalidate = GLOBAL_CACHE_SETTING

type UiLoadMoreButtonProps = {
  title: string
  onClick: () => void | Promise<void>
}

export default function UiLoadMoreButton({
  title,
  onClick,
}: UiLoadMoreButtonProps) {
  return (
    <button onClick={onClick} className={styles.customButton}>
      {title}
    </button>
  )
}
