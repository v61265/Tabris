'use client'
import Image from 'next/image'
import type { Category } from '~/graphql/query/categories'
import type { Show } from '~/graphql/query/shows'
import type { Sponsor } from '~/graphql/query/sponsors'
import menuSrc from '~/public/icons/side-menu-icon.svg'

type SideMenuProps = {
  categories: Category[]
  shows: Show[]
  sponsors: Sponsor[]
}

export default function SideMenu({
  categories,
  shows,
  sponsors,
}: SideMenuProps) {
  console.log(categories, shows, sponsors)
  return (
    <div>
      <Image src={menuSrc} alt="menu icon" priority />
    </div>
  )
}
