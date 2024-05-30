'use client'
import React, { useEffect, useRef, useCallback, useState } from 'react'
import styles from './_styles/gpt-popup.module.scss'
import GptAd from './gpt-ad'
import type { SlotRenderEndedEvent } from '~/types/event'

export default function GptPopup({ adKey = '' }: { adKey: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isCloseBtnVisible, setIsCloseBtnVisible] = useState(false)
  const [slotStyle, setSlotStyle] = useState<React.CSSProperties>({
    marginTop: '0px',
  })

  const closeAction = useCallback(() => {
    setIsVisible(false)
    console.log('[adGeek][Popup] close Popup')
  }, [])

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsCloseBtnVisible(true), 3000)
    }
  }, [isVisible])

  const handleSlotRenderEnded = useCallback((event: SlotRenderEndedEvent) => {
    const size = event?.size
    if (size && size?.[0] !== 1 && size?.[1] !== 1) {
      const height = typeof size[1] === 'number' ? size[1] : parseInt(size[1])
      setSlotStyle({ marginTop: `-${Math.round(height / 2)}px` })
      setIsVisible(true)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${styles.adGeekPopup} ${isVisible ? styles.shouldShow : ''}`}
    >
      <div className={styles.adGeekPopupOverlay} onClick={closeAction}></div>
      <div className={styles.adGeekPopupSlot} style={slotStyle}>
        <GptAd
          pageKey="fs"
          adKey={adKey}
          onSlotRenderEnded={handleSlotRenderEnded}
        />
        {isCloseBtnVisible && (
          <div className={styles.adGeekPopupClose} onClick={closeAction}>
            <img
              className={styles.adGeekPopupCloseBtn}
              src="https://sslcode.adgeek.com.tw/public/images/popup_close_button_large.png"
              alt="Close"
            />
          </div>
        )}
      </div>
    </div>
  )
}
