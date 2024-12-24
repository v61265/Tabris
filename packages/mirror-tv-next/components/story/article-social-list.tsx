import Image from 'next/image'
import styles from './_styles/article-social-list.module.scss'
import Link from 'next/link'
import { socialMediaConfig, socialMediaOrder } from '~/constants/social-medial'

const ArticleSocialList = () => {
  return (
    <div className={styles.followUsWrapper}>
      <p className={styles.followUs}>追蹤我們</p>
      <br className={styles.desktopOnly} />
      <ul className={styles.socialMediaList}>
        {socialMediaOrder.map((socialMedia) => {
          const socialMediaData = socialMediaConfig[socialMedia]
          const imageSize = 50
          const defaultImageSrc = '/images/image-default.jpg'

          if (!socialMediaData) {
            // 若無對應資料，使用預設圖片
            const defaultImageConfig = {
              alt: socialMedia,
              src: defaultImageSrc,
              width: imageSize,
              height: imageSize,
            }
            return (
              <li key={socialMedia}>
                <Image {...defaultImageConfig} />
              </li>
            )
          }

          const { image, href } = socialMediaData
          const imageConfig = {
            alt: socialMedia,
            src: image || defaultImageSrc,
            width: imageSize,
            height: imageSize,
          }

          return (
            <li key={socialMedia}>
              <Link href={href}>
                <Image {...imageConfig} />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default ArticleSocialList
