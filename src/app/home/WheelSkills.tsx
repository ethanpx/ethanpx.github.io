import SVGIcon from '@/components/UIs/SVGIcon'
import { SKILLS } from '@/constant/skills'
import clsx from 'clsx'
import { useLayoutEffect, useMemo, useState } from 'react'

const ITEM_WIDTH = 320 // in px
const ASPECT_RATIO = 4 / 3
type WheelDirector = 'vertical' | 'horizontal'

export default function WheelSkills() {
  const [step, setStep] = useState(1)
  const [director, setDirector] = useState<WheelDirector>('horizontal')

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

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % count)
    }, 3000)
    return () => clearInterval(interval)
  }, [count])

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setDirector((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
    }, 9000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-[200vh] -mt-[100vh] z-0">
      <div className="sticky top-24 flex flex-col items-center justify-center gap-4 h-screen">
        <div
          className="wheel-scene"
          style={{ width: ITEM_WIDTH, aspectRatio: ASPECT_RATIO }}
        >
          <div
            className="wheel-slide"
            style={{
              transform: `translateZ(-${tz}px) ${dir}(${360 - step * deg}deg)`,
            }}
          >
            {SKILLS.map((s, i) => (
              <div
                key={i}
                className={clsx('wheel-slide_item', {
                  expert: i > 3 && i <= 6,
                  advanced: i < 3,
                  working: i > 6,
                })}
                style={{
                  transform: `${dir}(${i * deg}deg) translateZ(${tz}px)`,
                  filter:
                    step === i
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
      </div>
      <div
        className="sticky top-24 left-0 w-fit px-4 py-2 bg-[#3B82F6]"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-neutral font-bold">Skills</span>
      </div>
    </div>
  )
}
