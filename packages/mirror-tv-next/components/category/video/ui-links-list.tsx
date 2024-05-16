import styles from './ui-links-list.module.scss'
import UiLinkCard from './ui-link-card'
import FacebookPlugin from '~/components/shared/facebook-plugin'
import type { LinkInfo } from './ui-link-card'

type UiLinkListsProps = {
  fbHref: string
}

export default function UiLinksList({ fbHref }: UiLinkListsProps) {
  const LINK_INFO: LinkInfo[] = [
    {
      href: '/anchorperson',
      leftText: '鏡主播',
      rightText: '追蹤',
      themeColor: 'rgb(28, 178, 230)',
      idForGaTarget: 'anchorperson',
      leftIcon: {
        src: '/icons/mnews-logo-white-simple.svg',
        width: 52,
        height: 16,
      },
      rightIcon: '/icons/microphone.svg',
    },
    {
      href: 'https://www.youtube.com/channel/UC4LjkybVKXCDlneVXlKAbmw',
      leftIcon: { src: '/icons/yt-rgb.png', width: 40, height: 28 },
      rightIcon: '/icons/subscription.svg',
      idForGaTarget: 'youtube-follow',
      leftText: '鏡新聞',
      rightText: '訂閱',
      themeColor: '#f00',
    },
    {
      href: 'https://lin.ee/4XsO8xi',
      leftIcon: { src: '/icons/line-rgb.svg', width: 35, height: 35 },
      idForGaTarget: 'line-follow',
      leftText: 'LINE',
      rightText: '加入好友',
      themeColor: '#06c755',
    },
  ]
  return (
    <div className={styles.wrapper}>
      <ul>
        {LINK_INFO.map((item) => (
          <UiLinkCard link={item} key={item.idForGaTarget} />
        ))}
      </ul>
      <FacebookPlugin href={fbHref} />
    </div>
  )
}
