import clsx from 'clsx'
import { useCallback, useMemo, type ChangeEvent } from 'react'

type RangeProps = {
  step?: number
  min?: number
  max?: number
  showLabels?: boolean
  value?: number
  onChange?: (value: number) => void
}

export default function Range({
  showLabels = true,
  value = 0,
  onChange = () => { },
  ...inputProps
}: RangeProps) {
  const { min = 0, max = 100, step } = inputProps

  const ticks = useMemo(() => {
    if (!step) return []
    const s = Number(step)
    const a: number[] = []
    if (!isFinite(min) || !isFinite(max) || s <= 0 || max < min) return a
    const range = Number(max) - Number(min)
    const count = Math.floor(range / s)
    const epsilon = 1e-9
    for (let i = 0; i <= count; i++) {
      const v = Number(min) + i * s
      const rounded = Math.round(v * 1e6) / 1e6
      a.push(rounded)
    }
    const last = a[a.length - 1]
    if (Math.abs(last - Number(max)) > epsilon) {
      a.push(Number(max))
    }
    return a
  }, [max, min, step])

  const rangeSize = Math.max(Number(max) - Number(min), 1) // avoid div by zero

  const valueToPercent = (v: number) => ((v - Number(min)) / rangeSize) * 100

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value)
      onChange(v)
    },
    [onChange],
  )

  return (
    <div className="flex flex-col gap-2 w-full h-fit px-2">
      <div className="relative flex flex-col justify-center w-full h-4">
        <div className="absolute left-0 w-full h-1 bg-base-100" />
        <div
          className="absolute left-0 h-1 bg-white"
          style={{ width: `${value}%` }}
        />
        {/* ticks (dots) */}
        {ticks.map((v, idx) => (
          <div
            key={idx}
            className={clsx('absolute w-4 h-4 -translate-x-1/2', {
              'bg-base-100': v > (value / max) * rangeSize + min,
              'bg-white': v <= (value / max) * rangeSize + min,
            })}
            style={{ left: `${valueToPercent(v)}%` }}
          />
        ))}

        <div
          className="absolute w-4 h-4 bg-amber-100 -translate-x-1/2 cursor-pointer"
          style={{ left: `${value}%` }}
        />
        <input
          value={value}
          onChange={handleChange}
          type="range"
          className="absolute w-[calc(100%+16px)] -left-2 h-4 z-20 cursor-pointer opacity-0"
          {...inputProps}
        />
      </div>

      {/* </div> */}
      {showLabels && !!step && (
        <div className="relative w-full h-6">
          {ticks.map((v, idx) => {
            return (
              <div
                className="absolute -translate-x-1/2"
                style={{ left: `${valueToPercent(v)}%` }}
                key={idx}
              >
                <span
                  className={clsx('text-xs', {
                    'text-secondary': v > (value / max) * rangeSize + min,
                    'text-primary font-bold':
                      v <= (value / max) * rangeSize + min,
                  })}
                >
                  {v}%
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}