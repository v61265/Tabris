import Image from 'next/image'
import Link from 'next/link'
import xSrc from 'public/icons/icon-x.svg'
import { HEADER_BOTTOM_LINKS } from '~/constants/constant'
import fbSrc from '~/public/icons/icon-fb.svg'
import igSrc from '~/public/icons/icon-ig.svg'
import lineSrc from '~/public/icons/icon-line-dark.svg'
import logoSrc from '~/public/icons/mnews-logo-white.svg'
import styles from '~/styles/components/layout/footer.module.scss'

const footerRightList = [
  { href: '/schedule', gaText: 'schedule', text: '電視節目表' },
  {
    href: '/story/press-self-regulation',
    text: '新聞自律',
  },
  { href: '/story/channel', text: '頻道位置' },
  { href: '/story/privacy', text: '隱私權政策' },
  {
    href: '/story/webauthorization',
    text: '內容授權',
  },

  {
    href: '/story/announce',
    text: '公告專區',
  },
  { href: '/story/adsales', text: '整合行銷' },
]

const socialLinks = [
  { href: HEADER_BOTTOM_LINKS.fb, src: fbSrc, alt: 'facebook icon' },
  { href: HEADER_BOTTOM_LINKS.line, src: lineSrc, alt: 'line icon' },
  { href: HEADER_BOTTOM_LINKS.ig, src: igSrc, alt: 'instagram icon' },
  { href: HEADER_BOTTOM_LINKS.x, src: xSrc, alt: 'x(former twitter) icon' },
]

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.topWrapper} ${styles.left}`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logoSrc} alt="mnews logo" priority />
          </Link>
        </div>
        <ul className={styles.iconsWrapper}>
          {socialLinks.map((link, index) => (
            <li className={styles.icon} key={index}>
              <Link href={link.href} target="_blank" rel="noopener noreferrer">
                <Image src={link.src} alt={link.alt} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.topWrapperMiddle}>
        <div className={styles.infoWrapper}>
          <p className={styles.__info}>
            <span>客服專線: </span>
            <span>(02)7752-5678 </span>
          </p>
          <p className={styles.__info}>
            <span>客服信箱: </span>
            <a href="mailto:mnews.cs@mnews.com.tw">mnews.cs@mnews.com.tw</a>
          </p>
        </div>
      </div>
      <div className={styles.topWrapperRight}>
        {footerRightList.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {item.text}
          </a>
        ))}
      </div>
      <ul className={styles.iconsWrapper}>
        {socialLinks.map((link, index) => (
          <li className={styles.icon} key={index}>
            <Link href={link.href} target="_blank" rel="noopener noreferrer">
              <Image src={link.src} alt={link.alt} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.bottomWrapper}>
        <div className={styles.texts}>
          <p className={styles.copyright}>
            <span>©Mirror TV BROADCASTING LTD.</span>
            <span>All Rights Reserved.</span>
            <span>鏡電視股份有限公司 版權所有</span>
          </p>
          <p className={styles.youtubeTos}>
            本網頁使用
            <a
              href="https://developers.google.com/youtube/terms/developer-policies#definition-youtube-api-services"
              target="_blank"
              rel="noreferrer noopener"
            >
              YouTube API 服務
            </a>
            ，詳見
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noreferrer noopener"
            >
              YouTube 服務條款
            </a>
            、
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Google 隱私權與條款
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
