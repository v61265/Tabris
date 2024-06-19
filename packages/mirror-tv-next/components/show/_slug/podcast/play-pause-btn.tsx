'use client'
import React, { useState } from 'react'
import styles from './_styles/play-pause-btn.module.scss'

interface PlayPauseButtonProps {
  isPlaying: boolean
  togglePlayPause: () => void
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  isPlaying,
  togglePlayPause,
}) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    togglePlayPause()
    setActive(!active)
  }

  return (
    <button className={styles.togglePlayBtn} onClick={handleClick}>
      <span className={isPlaying ? styles.pause : styles.play} />
    </button>
  )
}

export default PlayPauseButton
