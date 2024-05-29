'use client'
import React, { useEffect, useRef, useCallback, useState } from 'react'
import styles from './_styles/gpt-popup.module.scss'
import GptAd from './gpt-ad'

type SlotRenderEndedEvent = {
  size: [number, number]
}

export default function GptPopup({ adKey = '' }: { adKey: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
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
      setTimeout(() => setIsCloseBtnVisible(true), 1000)
    }
  }, [isVisible])

  const handleSlotRenderEnded = (event: SlotRenderEndedEvent) => {
    console.log('end:', event)
    const size = event.size
    if (size[0] !== 1 && size[1] !== 1) {
      setSlotStyle({ marginTop: `-${Math.round(size[1] / 2)}px` })
      setIsVisible(true)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`${styles['adGeek-popup']} ${isVisible ? 'flex' : ''}`}
    >
      <div
        className={styles['adGeek-popup-overlay']}
        onClick={closeAction}
      ></div>
      <div className={styles['adGeek-popup-slot']} style={slotStyle}>
        <GptAd
          pageKey="fs"
          adKey={adKey}
          onSlotRenderEnded={handleSlotRenderEnded}
        />
        <div
          className={styles['adGeek-popup-close']}
          style={{ display: isCloseBtnVisible ? 'block' : 'none' }}
          onClick={closeAction}
        >
          <img
            src="https://sslcode.adgeek.com.tw/public/images/popup_close_button_large.png"
            alt="Close"
            style={{ width: '40px', height: '40px' }}
          />
        </div>
      </div>
    </div>
  )
}
