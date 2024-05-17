import styles from './_styles/ui-load-more-button.module.scss'

type UiLoadMoreButtonProps = {
  title: string
  onClick: () => void | Promise<void>
}

export default function UiLoadMoreButton({
  title,
  onClick,
}: UiLoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[styles.customButton, 'g-button-load-more'].join(' ')}
    >
      {title}
    </button>
  )
}
