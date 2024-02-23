import errors from '@twreporter/errors'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClient } from '~/apollo-client'
import HeroImage from '~/components/topic/single-topic/hero-image'
import HeroSlideshow from '~/components/topic/single-topic/hero-slideshow'
import HeroVideo from '~/components/topic/single-topic/hero-video'
import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'
import type { SingleTopic } from '~/graphql/query/topic'
import { fetchPostsByTopicSlug } from '~/graphql/query/topic'
import styles from '~/styles/pages/single-topic-page.module.scss'

export const revalidate = GLOBAL_CACHE_SETTING

export default async function SingleTopicPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClient()
  let singleTopic: SingleTopic | undefined

  try {
    const response = await client.query({
      query: fetchPostsByTopicSlug,
      variables: {
        topicSlug: params.slug,
      },
    })
    const { topic }: { topic: SingleTopic[] } = response.data
    singleTopic = topic[0] ?? undefined

    // Throw an error if singleTopic is undefined
    if (!singleTopic) {
      throw new Error('Topic not found')
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching posts data for single topic page'
    )

    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingError, {
          withStack: false,
          withPayload: true,
        }),
      })
    )
    notFound()
  }

  const socialMediaLinks = [
    {
      platform: 'facebook',
      icon: '/icons/icon-fb-grey.svg',
      alt: 'facebook icon',
      url: singleTopic.facebook,
    },
    {
      platform: 'instagram',
      icon: '/icons/icon-ig-grey.svg',
      alt: 'instagram icon',
      url: singleTopic.instagram,
    },
    {
      platform: 'line',
      icon: '/icons/icon-line-grey.svg',
      alt: 'line icon',
      url: singleTopic.line,
    },
  ]

  console.log(singleTopic)

  return (
    <main className={styles.mainWrapper}>
      {singleTopic.leading === 'video' && (
        <HeroVideo videoSrc={singleTopic.heroVideo.url} />
      )}
      {singleTopic.leading === 'image' && (
        <HeroImage
          heroImage={singleTopic.heroImage}
          title={singleTopic.title}
        />
      )}
      {singleTopic.leading === 'slideshow' && (
        <HeroSlideshow
          heroImage={singleTopic.heroImage}
          title={singleTopic.title}
          slideshow={singleTopic.slideshow}
        />
      )}
      <section className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{singleTopic.title}</div>
          <div className={styles.socialIcons}>
            {socialMediaLinks.map(
              ({ platform, icon, alt, url }) =>
                url && (
                  <Link key={platform} href={url}>
                    <Image
                      src={icon}
                      alt={alt}
                      priority
                      width={20}
                      height={20}
                    />
                  </Link>
                )
            )}
          </div>
        </div>

        <div>{singleTopic.leading}</div>
      </section>
    </main>
  )
}
