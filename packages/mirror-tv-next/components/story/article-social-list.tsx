import Image from 'next/image'
import styles from './_styles/article-social-list.module.scss'
import Link from 'next/link'

const listData = [
  {
    href: 'https://www.facebook.com/mnewstw',
    image: '/images/social-media/fb-round.svg',
    type: 'facebook',
  },
  {
    href: 'https://www.instagram.com/mnewstw/',
    image: '/images/social-media/ig-round.svg',
    type: 'instagram',
  },
  {
    href: 'https://www.youtube.com/channel/UC4LjkybVKXCDlneVXlKAbmw',
    image: '/images/social-media/yt-round.svg',
    type: 'youtube',
  },
  {
    href: 'https://lin.ee/4XsO8xi',
    image: '/images/social-media/line-round.svg',
    type: 'line',
  },
  {
    href: 'https://twitter.com/mnews_tw',
    image: '/images/social-media/twitter-round.svg',
    type: 'twitter',
  },
]
const ArticleSocialList = () => {
  return (
    <div className={styles.followUsWrapper}>
      <p className={styles.followUs}>追蹤我們</p>
      <br className={styles.desktopOnly} />
      <ul className={styles.socialMediaList}>
        {listData.map((item) => (
          <li key={item.type}>
            <Link href={item.href}>
              <Image alt={item.type} src={item.image} width={50} height={50} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ArticleSocialList
