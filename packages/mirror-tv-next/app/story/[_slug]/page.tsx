import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'

export const revalidate = GLOBAL_CACHE_SETTING

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  return <section>stroy: {params.slug}</section>
}
