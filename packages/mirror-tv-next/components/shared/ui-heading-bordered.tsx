import styles from '~/styles/components/shared/ui-heading-bordered.module.scss'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'

export const revalidate = GLOBAL_CACHE_SETTING

type UiHeadingBorderedProps = {
  title: string
}

export default function UiHeadingBordered({ title }: UiHeadingBorderedProps) {
  return (
    <div className={['heading-bordered-wrapper', styles.wrapper].join(' ')}>
      <h1>{title}</h1>
    </div>
  )
}
