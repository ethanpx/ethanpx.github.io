type Listener = (y: number) => void

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

class VirtualScroll {
  y = 0
  targetY = 0
  lastY = 0
  listeners = new Set<Listener>()

  viewport!: HTMLElement
  root!: HTMLElement
  maxScroll = 0

  constructor() {
    this.loop = this.loop.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  init() {
    this.viewport = document.getElementById('viewport')!
    this.root = document.getElementById('app-root')!

    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    this.viewport.addEventListener('wheel', this.onWheel, { passive: false })
    this.viewport.addEventListener('touchstart', this.onTouchStart, {
      passive: false,
    })
    this.viewport.addEventListener('touchmove', this.onTouchMove, {
      passive: false,
    })
    requestAnimationFrame(this.loop)
  }

  handleResize() {
    const world = this.root.offsetHeight
    const view = window.innerHeight
    this.maxScroll = Math.max(0, world - view)
  }

  onWheel = (e: WheelEvent) => {
    e.preventDefault()
    this.targetY += e.deltaY
    this.targetY = clamp(this.targetY, 0, this.maxScroll)
  }

  onTouchStart = (e: TouchEvent) => {
    this.lastY = e.touches[0].clientY
  }

  onTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    const y = e.touches[0].clientY
    this.targetY += this.lastY - y
    this.targetY = clamp(this.targetY, 0, this.maxScroll)
    this.lastY = y
  }

  loop() {
    const diff = this.targetY - this.y
    if (Math.abs(diff) < 0.1) {
      this.y = this.targetY
    } else {
      this.y += diff * 0.1
    }
    this.y = clamp(this.y, 0, this.maxScroll)
    this.root.style.transform = `translate3d(0, ${-this.y}px, 0)`
    this.listeners.forEach((l) => l(this.y))

    requestAnimationFrame(this.loop)
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  getY() {
    return this.y
  }
}

export const virtualScroll = new VirtualScroll()
export const getVirtualScrollY = () => virtualScroll.getY()
