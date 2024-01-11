import UiPcFlashNews from '~/components/flash-news/ui-pc-flash-news'
import OtherItems from '~/components/layout/header/other-items'
import styles from '~/styles/components/layout/header/header-bottom.module.scss'

export default function HeaderBottom(): JSX.Element {
  return (
    <div className={styles.headerBottomWrapper}>
      <UiPcFlashNews />
      <OtherItems />
    </div>
  )
}
