'use client'
import React, { useState } from 'react'
import styles from './_styles/play-pause-btn.module.scss'

interface PlayPauseButtonProps {
  isPlaying: boolean
  togglePlayPause: () => void
}

export default function PlayPauseButton({
  isPlaying,
  togglePlayPause,
}: PlayPauseButtonProps) {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    togglePlayPause()
    setActive(!active)
  }

  return (
    <div
      className={`${styles.togglePlayBtn} player__control`}
      onClick={handleClick}
    >
      <span className={isPlaying ? styles.pause : styles.play} />
    </div>
  )
}
