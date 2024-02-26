import styles from '~/styles/components/shared/ui-heading-bordered.module.scss'

type UiHeadingBorderedProps = {
  title: string
  className?: string
}

export default function UiHeadingBordered({
  title,
  className = '',
}: UiHeadingBorderedProps) {
  return (
    <div
      className={['heading-bordered-wrapper', styles.wrapper, className].join(
        ' '
      )}
    >
      <h1>{title}</h1>
    </div>
  )
}
