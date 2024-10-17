'use client'
import React, { useEffect, useMemo, useState } from 'react'
import InfoSubmissionModal from './info-submission-modal'
import { ARTICLE_READ_THRESHOLD } from '~/constants/lottery'
import styles from './_styles/counter.module.scss'
import Cookies from 'js-cookie'

export default function Counter() {
  const [showModal, setShowModal] = useState(false)
  const [readStorySlugs, setReadStorySlugs] = useState<string[]>([])
  const [redeemCount, setRedeemCount] = useState<number>(0)

  const fetchCookies = () => {
    const slugsCookieValue = Cookies.get('read-story-slugs')
    const redeemCookieValue = Cookies.get('redeem-count')

    if (slugsCookieValue) {
      setReadStorySlugs(JSON.parse(slugsCookieValue))
    } else {
      setReadStorySlugs([])
    }

    if (redeemCookieValue) {
      setRedeemCount(parseInt(redeemCookieValue, 10))
    } else {
      setRedeemCount(0)
    }
  }

  useEffect(() => {
    fetchCookies()
  }, [])

  const slugCount = readStorySlugs.length
  const canUnlock = useMemo(() => {
    return (
      slugCount - redeemCount * ARTICLE_READ_THRESHOLD >= ARTICLE_READ_THRESHOLD
    )
  }, [slugCount, redeemCount])

  const handleOpenModal = () => {
    setShowModal(true)
    console.log({ showModal })
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div>
      <div className={`${styles.counter} ${canUnlock ? styles.unlock : ''}`}>
        <img alt="counter" src="/images/read-story-counter.png" />
        <span className={`${styles.number} ${canUnlock ? styles.unlock : ''}`}>
          {slugCount - redeemCount * ARTICLE_READ_THRESHOLD}
        </span>
        {canUnlock && (
          <div className={styles.unlocked} onClick={handleOpenModal}>
            點擊獲得
            <br />
            抽獎資格
          </div>
        )}
      </div>
      {showModal && (
        <InfoSubmissionModal
          onClose={handleClose}
          readSlugs={readStorySlugs}
          redeemCount={redeemCount}
          incrementRedeem={() => setRedeemCount((prev) => prev + 1)}
        />
      )}
    </div>
  )
}
