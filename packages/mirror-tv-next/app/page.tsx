'use client'
import styled from 'styled-components'
import styles from './page.module.css'

const TestWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: pink;
`

export default function Home() {
  return (
    <main className={styles.main}>
      <TestWrapper>Hello, world.</TestWrapper>
    </main>
  )
}
