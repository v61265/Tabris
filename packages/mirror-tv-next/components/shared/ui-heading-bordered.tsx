import styles from '~/styles/components/shared/ui-heading-bordered.module.scss'

type UiHeadingBorderedProps = {
  title: string
  className?: string
  htmlTag?: 'h1' | 'h2' | 'h3'
}

export default function UiHeadingBordered({
  title,
  className = '',
  htmlTag = 'h1',
}: UiHeadingBorderedProps) {
  return (
    <div
      className={['heading-bordered-wrapper', styles.wrapper, className].join(
        ' '
      )}
    >
      {htmlTag === 'h1' && <h1>{title}</h1>}
      {htmlTag === 'h2' && <h2>{title}</h2>}
      {htmlTag === 'h3' && <h3>{title}</h3>}
    </div>
  )
}
