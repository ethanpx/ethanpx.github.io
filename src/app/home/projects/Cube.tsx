import {
  Fragment,
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { PROJECTS } from '@/constant/projects'
import { useIsMobile } from '@/hooks/useIsMobile'
import clsx from 'clsx'
import { randomColor } from '@/helpers/utils'
import { useInnerScroll } from '@/hooks/useInnerScroll'

type CubeProps = { imgKey: string }
type FaceProps = { label: string; t: string; src: string }
function Face({ t, src }: FaceProps) {
  return (
    <div
      className={`absolute inset-0`}
      style={{
        transform: `${t} translateZ(0.1px)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        boxShadow: 'inset 0 0 1px #fff',
      }}
    >
      <div
        className={`relative w-full h-full flex items-center justify-center bg-cover bg-no-repeat`}
      >
        <img
          className="absolute w-full h-full object-cover z-0"
          src={src}
          alt="background"
        />
        {/* <div className="relative z-10">
          <span className="text-white text-xs">{label}</span>
          <span>{src}</span>
        </div> */}
      </div>
    </div>
  )
}

export function Cube({ imgKey }: CubeProps) {
  const isMobile = useIsMobile()

  const size = useMemo(() => (isMobile ? 200 : 400), [isMobile])
  const half = useMemo(() => size / 2, [size])

  const elRef = useRef<HTMLDivElement>(null)

  const rotRef = useRef({ x: -30, y: -35 })
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
        el.style.transform = `
        perspective(1000px)
        rotateX(${x}deg)
        rotateY(${y}deg)
      `
      })
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      e.preventDefault()
      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y
      // giữ nguyên hướng xoay của mày
      rotRef.current.x += dy * SPEED * -1
      rotRef.current.y += dx * SPEED * 1
      startRef.current = { x: e.clientX, y: e.clientY }
      apply()
    }

    const onPointerUp = (e: PointerEvent) => {
      draggingRef.current = false
      el.style.transition = 'transform 0.6s ease'
      rotRef.current.x %= 360
      rotRef.current.y %= 360
      apply()
      el.releasePointerCapture(e.pointerId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault()
      draggingRef.current = true
      startRef.current = { x: e.clientX, y: e.clientY }
      el.style.transition = 'none'
      el.setPointerCapture(e.pointerId)
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
    }
    el.addEventListener('pointerdown', onPointerDown)
    apply()
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <div className="relative p-4 size-fit transition-all touch-none select-none">
      <div
        ref={elRef}
        className="relative aspect-square will-change-transform cursor-grab active:cursor-grabbing touch-none"
        style={{
          width: size,
          transformStyle: 'preserve-3d',
        }}
      >
        <Face
          label="front"
          t={`translateZ(${half}px)`}
          src={`/projects/${imgKey}/1.png`}
        />
        <Face
          label="back"
          t={`rotateY(180deg) translateZ(${half}px)`}
          src={`/projects/${imgKey}/2.png`}
        />
        <Face
          label="left"
          t={`rotateY(-90deg) translateZ(${half}px)`}
          src={`/projects/${imgKey}/3.png`}
        />
        <Face
          label="right"
          t={`rotateY(90deg) translateZ(${half}px)`}
          src={`/projects/${imgKey}/4.png`}
        />
        <Face
          label="top"
          t={`rotateX(90deg) translateZ(${half}px)`}
          src={`/projects/${imgKey}/5.png`}
        />
        <Face
          label="bottom"
          t={`rotateX(-90deg) translateZ(${half}px)`}
          src={`/projects/${imgKey}/6.png`}
        />
      </div>
    </div>
  )
}

function ProjectTag({ children }: PropsWithChildren) {
  const color = useMemo(() => {
    if (!children || typeof children !== 'string') return '#fff'
    return randomColor(children)
  }, [children])

  if (!children) return <Fragment />
  return (
    <span
      className="text-[10px] rounded-xs px-1 text-neutral"
      style={{ background: color }}
    >
      {children}
    </span>
  )
}
export default function CubeContainer() {
  const projectRef = useRef<HTMLDivElement | null>(null)
  const [activeKey, setActiveKey] = useState(PROJECTS[1].img)
  useInnerScroll(projectRef)

  const onClick = (key: string) => {
    setActiveKey(key)
  }

  return (
    <div className="flex flex-col md:grid grid-cols-12 gap-6 md:gap-4 p-4">
      <div className="order-2 md:order-1 col-span-full md:col-span-5 h-fit">
        <div
          ref={projectRef}
          className="w-full flex flex-row flex-nowrap md:grid grid-cols-2 gap-2 md:gap-4 overflow-x-auto"
        >
          {PROJECTS.map((p, i) => (
            <div
              className={clsx(
                'w-full min-w-[80vw] md:min-w-min cursor-pointer p-2 flex flex-col gap-4 border border-base-100 rounded-sm',
                { 'bg-base-200 border-amber-300!': activeKey === p.img },
              )}
              onClick={() => onClick(p.img)}
              key={i}
            >
              <div className="flex flex-row gap-2 items-center">
                <img
                  className="w-6 h-auto object-contain"
                  src={`/projects/${p.img}/logo.png`}
                />
                <p className="text-sm md:text-base">{p.title}</p>
              </div>
              <span className="text-xs text-secondary">{p.description}</span>
              <div className="flex flex-row flex-wrap gap-1">
                {p.tags.map((t) => (
                  <ProjectTag key={t}>{t}</ProjectTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="order-1 md:order-2 col-span-full md:col-span-7 w-full flex flex-col gap-12 md:gap-24 items-center">
        <Cube imgKey={activeKey} />
        <span>
          <b className="text-primary">HOLD & DRAG</b> to view more
        </span>
      </div>
    </div>
  )
}
