import styles from './footer.module.scss'

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footerWrapper}>
      <p className="main">Hi footer</p>
    </footer>
  )
}
