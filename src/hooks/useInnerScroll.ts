import { RefObject, useEffect } from 'react'

export function useInnerScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

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

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [ref])
}
