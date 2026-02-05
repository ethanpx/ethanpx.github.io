import { RefObject, useLayoutEffect } from 'react'
import { getVirtualScrollY } from '@/helpers/virtualScroll'

function getOffsetTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}
export function useFakeSticky<T extends HTMLElement | null>(
  ref: RefObject<T>,
  top = 0,
) {
  useLayoutEffect(() => {
    const el = ref.current!
    const parent = el.offsetParent as HTMLElement

    let elTop = 0
    let parentTop = 0
    let parentHeight = 0
    let elHeight = 0

    const measure = () => {
      elTop = getOffsetTop(el)
      parentTop = getOffsetTop(parent)
      parentHeight = parent.offsetHeight
      elHeight = el.offsetHeight
    }

    measure()
    window.addEventListener('resize', measure)

    const update = () => {
      const y = getVirtualScrollY()

      const startStick = elTop - top
      const endStick = parentTop + parentHeight - elHeight - top

      let translate = 0

      if (y < startStick) {
        translate = 0
      } else if (y <= endStick) {
        translate = y - startStick
      } else {
        translate = endStick - startStick
      }

      el.style.transform = `translate3d(0, ${translate}px, 0)`
      requestAnimationFrame(update)
    }

    update()

    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [ref, top])
}
