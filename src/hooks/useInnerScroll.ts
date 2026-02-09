import { virtualScroll } from '@/helpers/virtualScroll'
import { RefObject, useEffect } from 'react'

export function useInnerScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // required css
    el.style.overflow = 'hidden'
    el.style.touchAction = 'none'

    // wheel - desktop
    const onWheel = (e: WheelEvent) => {
      const canScrollX =
        el.scrollWidth > el.clientWidth &&
        Math.abs(e.deltaX) > Math.abs(e.deltaY)

      const canScrollY =
        el.scrollHeight > el.clientHeight &&
        Math.abs(e.deltaY) >= Math.abs(e.deltaX)

      if (canScrollX || canScrollY) {
        e.stopPropagation()
        e.preventDefault()

        el.scrollLeft += e.deltaX
        el.scrollTop += e.deltaY
      }
    }

    // touch - mobile
    let lastX = 0
    let lastY = 0
    let velocityX = 0
    let velocityY = 0
    let momentumId: number | null = null

    const stopMomentum = () => {
      if (momentumId) {
        cancelAnimationFrame(momentumId)
        momentumId = null
      }
    }

    const momentum = () => {
      velocityX *= 0.95
      velocityY *= 0.95

      el.scrollLeft += velocityX
      el.scrollTop += velocityY

      if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
        momentumId = requestAnimationFrame(momentum)
      } else {
        momentumId = null
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      virtualScroll.pause()

      stopMomentum()
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      const dx = lastX - x
      const dy = lastY - y

      const canScrollX =
        el.scrollWidth > el.clientWidth && Math.abs(dx) > Math.abs(dy)

      const canScrollY =
        el.scrollHeight > el.clientHeight && Math.abs(dy) >= Math.abs(dx)

      if (canScrollX || canScrollY) {
        e.stopPropagation()
        e.preventDefault()

        el.scrollLeft += dx
        el.scrollTop += dy

        velocityX = dx
        velocityY = dy
      }

      lastX = x
      lastY = y
    }

    const onTouchEnd = () => {
      virtualScroll.resume()
      momentum()
    }

    // ================= EVENTS =================
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      stopMomentum()
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [ref])
}
