import styles from '~/styles/components/shared/ui-load-more-button.module.scss'

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
