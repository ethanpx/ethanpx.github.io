import { useMemo, useRef, useState } from 'react'
import clsx from 'clsx'

import SVGIcon from '@/components/UIs/SVGIcon'

import { SkillLevel, SKILLS } from '@/constant/skills'
import { useFakeSticky } from '@/hooks/useFakeSticky'

const ITEM_WIDTH = 320 // in px
const ASPECT_RATIO = 4 / 3
type WheelDirector = 'vertical' | 'horizontal'

function StickyTag() {
  const stickyRef = useRef<HTMLDivElement | null>(null)
  useFakeSticky(stickyRef, 120)

  return (
    <div
      ref={stickyRef}
      className="sticky top-24 left-0 w-fit px-4 py-2 bg-[#3B82F6]"
      style={{ writingMode: 'vertical-rl' }}
    >
      <span className="text-neutral font-bold">Skills</span>
    </div>
  )
}

function StickyWheel() {
  const elmRef = useRef<HTMLDivElement | null>(null)
  const [step, setStep] = useState(1)
  const [director] = useState<WheelDirector>('horizontal')

  useFakeSticky(elmRef, 0)

  const count = useMemo(() => SKILLS.length, [])
  const deg = useMemo(() => 360 / count, [count])
  const tz = useMemo(() => {
    const size =
      director === 'horizontal' ? ITEM_WIDTH : ITEM_WIDTH / ASPECT_RATIO
    return Math.round(size / 2 / Math.tan(Math.PI / count))
  }, [count, director])
  const dir = useMemo(() => {
    return director === 'horizontal' ? 'rotateY' : 'rotateX'
  }, [director])

  const onNext = () => {
    setStep((prev) => prev + 1)
  }
  const onPrev = () => {
    setStep((prev) => prev - 1)
  }

  return (
    <div
      ref={elmRef}
      className="sticky top-24 max-w-dvw h-dvh flex flex-col items-center justify-center gap-4 overflow-x-hidden"
    >
      <div
        className="wheel-scene"
        style={{ width: ITEM_WIDTH, aspectRatio: ASPECT_RATIO }}
      >
        <div
          className="wheel-slide"
          style={{
            transform: `translateZ(-${tz}px) ${dir}(${-step * deg}deg)`,
          }}
        >
          {SKILLS.map((s, i) => (
            <div
              key={i}
              className={clsx('wheel-slide_item', {
                expert: s.level === SkillLevel.EXPERT,
                advanced: s.level === SkillLevel.ADVANCED,
                working: s.level === SkillLevel.WORKING,
              })}
              style={{
                transform: `${dir}(${i * deg}deg) translateZ(${tz}px)`,
                filter:
                  ((step % count) + count) % count === i
                    ? 'none'
                    : 'blur(1.5px) grayscale(1) brightness(0.7)',
              }}
            >
              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-bold">{s.name}</p>
                </div>
                <ul className="list-disc text-xs text-secondary">
                  {s.items.map((info, j) => (
                    <li key={j} className="flex flex-row gap-2 items-center">
                      {!!info.icon && (
                        <SVGIcon className="w-3!" name={info.icon} />
                      )}
                      <p>{info.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* controls */}
      <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-between">
        <button>
          <SVGIcon size={38} name="chevron-left" onClick={onPrev} />
        </button>
        <button className="ml-4">
          <SVGIcon size={38} name="chevron-right" onClick={onNext} />
        </button>
      </div>
    </div>
  )
}

export default function WheelSkills() {
  return (
    <div className="relative min-h-[200dvh] -mt-[100dvh] z-0">
      <StickyWheel />
      <StickyTag />
    </div>
  )
}
