import { useEffect, useState } from 'react'

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isMobileAgent = /Android|iPhone|iPad|iPod|Windows Phone/i.test(
      navigator.userAgent,
    )
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

      const handleResize = () =>
        setIsMobile(mediaQuery.matches || isMobileAgent)
      handleResize()

      mediaQuery.addEventListener('change', handleResize)
      return () => mediaQuery.removeEventListener('change', handleResize)
    } else {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= breakpoint || isMobileAgent)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isMobile
}
