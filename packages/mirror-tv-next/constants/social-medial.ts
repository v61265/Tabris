interface SocialMediaConfig {
  [type: string]: {
    href: string
    image: string
  }
}

const socialMediaConfig: SocialMediaConfig = {
  facebook: {
    href: 'https://www.facebook.com/mnewstw',
    image: '/images/social-media/fb-round.svg',
  },
  instagram: {
    href: 'https://www.instagram.com/mnewstw/',
    image: '/images/social-media/ig-round.svg',
  },
  youtube: {
    href: 'https://www.youtube.com/channel/UC4LjkybVKXCDlneVXlKAbmw',
    image: '/images/social-media/yt-round.svg',
  },
  line: {
    href: 'https://lin.ee/4XsO8xi',
    image: '/images/social-media/line-round.svg',
  },
  twitter: {
    href: 'https://twitter.com/mnews_tw',
    image: '/images/social-media/twitter-round.svg',
  },
}

const socialMediaOrder = ['facebook', 'instagram', 'youtube', 'line', 'twitter']

export { socialMediaConfig, socialMediaOrder }
