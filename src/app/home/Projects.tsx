import { useState } from 'react'

export default function Projects() {
  const [active, setActive] = useState(false)
  const [rot, setRot] = useState({ x: 0, y: 0 })

  const [animate, setAnimate] = useState(true)

  const size = 192
  const half = size / 2

  const normalize = (deg: number) => ((deg % 360) + 360) % 360

  const rebaseRotation = () => {
    setAnimate(false)

    setRot((r) => ({
      x: normalize(r.x),
      y: normalize(r.y),
    }))

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true)
      })
    })
  }

  const rotateX = (step: number) => setRot((r) => ({ ...r, x: r.x + step }))

  const rotateY = (step: number) => setRot((r) => ({ ...r, y: r.y + step }))

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex gap-2">
        <button onClick={() => rotateX(90)}>X +90</button>
        <button onClick={() => rotateX(-90)}>X -90</button>
        <button onClick={() => rotateY(90)}>Y +90</button>
        <button onClick={() => rotateY(-90)}>Y -90</button>
      </div>
      <label className="w-fit flex flex-row gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={active}
          onChange={() =>
            setActive((pev) => {
              rebaseRotation()
              return !pev
            })
          }
        />
        Activate 3D Cube
      </label>
      {/* Scene */}
      <div className="relative p-4 size-fit perspective-[1000px]">
        <div
          className="relative aspect-square"
          style={{
            width: size,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transition: animate ? 'transform 0.6s ease' : 'none',
          }}
        >
          {/* FRONT */}
          <Face
            label="front"
            color="bg-amber-900/85"
            t={`translateZ(${half}px)`}
          />

          {/* BACK */}
          <Face
            label="back"
            color="bg-fuchsia-900/85"
            t={`rotateY(${active ? 180 : 0}deg) translateZ(${half}px)`}
            opacity={active ? 1 : 0}
          />

          {/* LEFT */}
          <Face
            label="left"
            color="bg-blue-900/85"
            t={`rotateY(${active ? -90 : 0}deg) translateZ(${half}px)`}
            opacity={active ? 1 : 0}
          />

          {/* RIGHT */}
          <Face
            label="right"
            color="bg-green-900/85"
            t={`rotateY(${active ? 90 : 0}deg) translateZ(${half}px)`}
            opacity={active ? 1 : 0}
          />

          {/* TOP */}
          <Face
            label="top"
            color="bg-purple-900/85"
            t={`rotateX(${active ? 90 : 0}deg) translateZ(${half}px)`}
            opacity={active ? 1 : 0}
          />

          {/* BOTTOM */}
          <Face
            label="bottom"
            color="bg-lime-900/85"
            t={`rotateX(${active ? -90 : 0}deg) translateZ(${half}px)`}
            opacity={active ? 1 : 0}
          />
        </div>
      </div>
    </div>
  )
}
function Face({
  label,
  color,
  t,
  opacity = 1,
}: {
  label: string
  color: string
  t: string
  opacity?: number
}) {
  return (
    <div
      className={`absolute inset-0 border border-white/20 ${color} flex items-center justify-center transition-all duration-700`}
      style={{
        transform: t,
        opacity,
      }}
    >
      {label}
    </div>
  )
}
