import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'

export const revalidate = GLOBAL_CACHE_SETTING

export default async function TagPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <section>
      <div>{params.slug}</div>
    </section>
  )
}
