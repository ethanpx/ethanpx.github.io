type Listener = (y: number) => void

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

const TOUCH_MULTIPLIER = 2.4
const EASE = 0.1
const SNAP_THRESHOLD = 0.1

class VirtualScroll {
  y = 0
  targetY = 0
  lastY = 0
  maxScroll = 0
  isPaused = false

  listeners = new Set<Listener>()

  viewport!: HTMLElement
  root!: HTMLElement

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

  // ===== PUBLIC CONTROL =====
  pause() {
    this.isPaused = true
  }

  resume() {
    this.isPaused = false
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  getY() {
    return this.y
  }

  // ===== INTERNAL =====
  handleResize() {
    const world = this.root.offsetHeight
    const view = window.innerHeight
    this.maxScroll = Math.max(0, world - view)
  }

  onWheel = (e: WheelEvent) => {
    if (this.isPaused) return
    e.preventDefault()
    this.targetY += e.deltaY
    this.targetY = clamp(this.targetY, 0, this.maxScroll)
  }

  onTouchStart = (e: TouchEvent) => {
    this.lastY = e.touches[0].clientY
  }

  onTouchMove = (e: TouchEvent) => {
    if (this.isPaused) return
    e.preventDefault()

    const y = e.touches[0].clientY
    this.targetY += (this.lastY - y) * TOUCH_MULTIPLIER
    this.targetY = clamp(this.targetY, 0, this.maxScroll)
    this.lastY = y
  }

  loop() {
    const diff = this.targetY - this.y

    if (Math.abs(diff) < SNAP_THRESHOLD) {
      this.y = this.targetY
    } else {
      this.y += diff * EASE
    }

    this.y = clamp(this.y, 0, this.maxScroll)

    this.root.style.transform = `translate3d(0, ${-this.y}px, 0)`

    this.listeners.forEach((l) => l(this.y))

    requestAnimationFrame(this.loop)
  }
}

export const virtualScroll = new VirtualScroll()
export const getVirtualScrollY = () => virtualScroll.getY()
