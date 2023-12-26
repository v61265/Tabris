'use client'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import type { Category } from '~/graphql/query/categories'

type NavItemProps = {
  categories: Category[]
}

const ItemsWrapper = styled.div`
  background-color: yellowgreen;
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
`
const Li = styled.li`
  padding: 0 8px;
`

const RestOfTheCategories = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-wrap: wrap;
  width: 100%;
`

export default function NavItems({ categories }: NavItemProps) {
  console.log(categories)

  const [showRest, setShowRest] = useState(false)
  const totalVisibleCategories = 9 // Number of categories initially visible

  const handleSeeMoreClick = () => {
    setShowRest((prevState) => !prevState) // Toggle the showRest state
  }

  return (
    <ItemsWrapper>
      {categories.slice(0, totalVisibleCategories).map((category) => (
        <Li key={category.id}>
          <Link href={`/category/${category.slug}`}>{category.name}</Link>
        </Li>
      ))}
      {categories.length > totalVisibleCategories && (
        <Li onClick={handleSeeMoreClick}>看更多</Li>
      )}
      <RestOfTheCategories show={showRest}>
        {categories.slice(totalVisibleCategories).map((category) => (
          <Li key={category.id}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Li>
        ))}
      </RestOfTheCategories>
    </ItemsWrapper>
  )
}
