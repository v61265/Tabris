import styles from '~/styles/components/layout/header/other-items.module.scss'

export default function OtherItems(): JSX.Element {
  return (
    <div className={styles.otherItemsWrapper}>
      <ul className={styles.items}>
        <li>公評人專區</li>
        <li>鏡主播</li>
        <li>關於我們</li>
        <li>fb</li>
        <li>line</li>
        <li>ig</li>
        <li>x</li>
      </ul>
    </div>
  )
}
