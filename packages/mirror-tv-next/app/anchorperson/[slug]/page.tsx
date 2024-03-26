import errors from '@twreporter/errors'
import { notFound } from 'next/navigation'
import { getClient } from '~/apollo-client'
import AnchorImg from '~/components/anchorperson/anchor-img'
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

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <AnchorImg heroImage={singleAnchor.showhostImg} />
        <div className={styles.contentWrapper}>
          <div className={styles.title}>{singleAnchor.name}</div>
        </div>
      </section>
    </main>
  )
}
