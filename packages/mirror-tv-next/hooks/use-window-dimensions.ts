import { useState, useEffect } from 'react'

interface WindowDimensions {
  width: number | undefined
  height: number | undefined
}

function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions(): WindowDimensions {
  // Initialize state with undefined width/height so server and client renders match
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
