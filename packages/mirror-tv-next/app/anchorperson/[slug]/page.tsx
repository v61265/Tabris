import errors from '@twreporter/errors'
import { notFound } from 'next/navigation'
import { getClient } from '~/apollo-client'
import AnchorImg from '~/components/anchorperson/anchor-img'
import SocialIcon from '~/components/anchorperson/social-icon'
import type { SingleAnchor } from '~/graphql/query/contact'
import { fetchContactBySlug } from '~/graphql/query/contact'
import styles from '~/styles/pages/single-anchorperson-page.module.scss'

export default async function singleAnchor({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClient()
  let singleAnchor: SingleAnchor

  try {
    const response = await client.query({
      query: fetchContactBySlug,
      variables: {
        slug: params.slug,
      },
    })
    const data = response.data
    singleAnchor = data.allContacts[0]

    console.log(singleAnchor)

    if (!singleAnchor) {
      const annotatingError = errors.helpers.wrap(
        new Error('Anchor not found'),
        'UnhandledError',
        'Error occurs while fetching data for single anchor page'
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
      throw annotatingError
    }
  } catch (err) {
    console.error(err)
    notFound()
  }

  const socialMediaIcons = [
    {
      href: singleAnchor.facebook,
      src: '/icons/icon-fb.svg',
      alt: 'facebook icon',
    },
    { href: singleAnchor.twitter, src: '/icons/icon-x.svg', alt: 'x icon' },
    {
      href: singleAnchor.instagram,
      src: '/icons/icon-ig.svg',
      alt: 'instagram icon',
    },
  ]

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <AnchorImg heroImage={singleAnchor.showhostImg} />
        <div className={styles.contentWrapper}>
          <div className={styles.titleIconWrapper}>
            <div className={styles.title}>{singleAnchor.name}</div>
            <div className={styles.socialIcons}>
              {socialMediaIcons.map(
                (icon, index) =>
                  icon.href && (
                    <SocialIcon
                      key={index}
                      href={icon.href}
                      src={icon.src}
                      alt={icon.alt}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
