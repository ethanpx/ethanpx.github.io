import { useLayoutEffect, useRef } from 'react'

function Face({
  label,
  color,
  t,
}: {
  label: string
  color: string
  t: string
}) {
  return (
    <div
      className={`absolute inset-0 ${color} flex items-center justify-center`}
      style={{
        transform: `${t} translateZ(0.1px)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {label}
    </div>
  )
}

export function Cube() {
  const size = 192
  const half = size / 2

  const elRef = useRef<HTMLDivElement>(null)

  const rotRef = useRef({ x: 0, y: 0 })
  const startRef = useRef({ x: 0, y: 0 })
  const draggingRef = useRef(false)

  useLayoutEffect(() => {
    const el = elRef.current!
    const SPEED = 0.4
    let raf = 0

    const apply = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const { x, y } = rotRef.current

        // ✅ Perspective đưa vào transform matrix
        el.style.transform = `
          perspective(1000px)
          rotateX(${x}deg)
          rotateY(${y}deg)
        `
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return

      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y

      rotRef.current.x += dy * SPEED * -1
      rotRef.current.y += dx * SPEED * 1

      startRef.current = { x: e.clientX, y: e.clientY }

      apply()
    }

    const onMouseUp = () => {
      draggingRef.current = false
      el.style.transition = 'transform 0.6s ease'

      rotRef.current.x %= 360
      rotRef.current.y %= 360

      apply()

      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      draggingRef.current = true
      startRef.current = { x: e.clientX, y: e.clientY }
      el.style.transition = 'none'

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }

    el.addEventListener('mousedown', onMouseDown)

    apply()

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  return (
    <div className="relative p-4 size-fit transition-all">
      <div
        ref={elRef}
        className="relative aspect-square will-change-transform"
        style={{
          width: size,
          transformStyle: 'preserve-3d',
        }}
      >
        <Face label="front" color="bg-amber-900" t={`translateZ(${half}px)`} />
        <Face
          label="back"
          color="bg-fuchsia-900"
          t={`rotateY(180deg) translateZ(${half}px)`}
        />
        <Face
          label="left"
          color="bg-blue-900"
          t={`rotateY(-90deg) translateZ(${half}px)`}
        />
        <Face
          label="right"
          color="bg-green-900"
          t={`rotateY(90deg) translateZ(${half}px)`}
        />
        <Face
          label="top"
          color="bg-purple-900"
          t={`rotateX(90deg) translateZ(${half}px)`}
        />
        <Face
          label="bottom"
          color="bg-lime-900"
          t={`rotateX(-90deg) translateZ(${half}px)`}
        />
      </div>
    </div>
  )
}

export default function CubeContainer() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4">
      {[...Array(9)].map((_, i) => (
        <Cube key={i} />
      ))}
    </div>
  )
}
