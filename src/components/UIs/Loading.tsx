import { useEffect, useRef } from 'react'

interface LoadingCanvasProps {
  particleCount?: number
  maxDepth?: number
  color?: string
  speed?: number
  mode?: ('text' | 'circle' | 'square' | 'bars' | 'wave' | 'pulse')[]
}

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3)
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('')
  const num = parseInt(hex, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(',')
}

export default function LoadingCanvas({
  particleCount = 400,
  maxDepth = 500,
  color = '#00ffcc',
  speed = 2,
  mode = ['text'],
}: LoadingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    // background star particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * w * 2,
      y: (Math.random() - 0.5) * h * 2,
      z: Math.random() * maxDepth,
    }))

    function project(p: { x: number; y: number; z: number }) {
      const scale = 200 / p.z
      return {
        sx: w / 2 + p.x * scale,
        sy: h / 2 + p.y * scale,
        r: Math.max(0, 1.5 - p.z / maxDepth),
        a: Math.max(0.1, 1 - p.z / maxDepth),
      }
    }

    // puzzle setup
    const puzzleSize = 8
    const cellSize = 20
    const startRadius = Math.max(w, h) * 0.6
    const puzzle: {
      x: number
      y: number
      tx: number
      ty: number
      progress: number
      dir: 1 | -1
    }[] = []

    for (let i = 0; i < puzzleSize; i++) {
      for (let j = 0; j < puzzleSize; j++) {
        const angle = Math.random() * Math.PI * 2
        const r = startRadius * (0.5 + Math.random() * 0.5)
        puzzle.push({
          x: w / 2 + Math.cos(angle) * r,
          y: h / 2 + Math.sin(angle) * r,
          tx: w / 2 + (i - puzzleSize / 2) * cellSize,
          ty: h / 2 + (j - puzzleSize / 2) * cellSize,
          progress: 0,
          dir: 1,
        })
      }
    }

    let tick = 0
    function animate() {
      if (!ctx) return
      ctx.fillStyle = '#141510'
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p) => {
        p.z -= speed
        if (p.z <= 1) {
          p.x = (Math.random() - 0.5) * w * 2
          p.y = (Math.random() - 0.5) * h * 2
          p.z = maxDepth
        }
        const { sx, sy, r, a } = project(p)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${hexToRgb(color)},${a.toFixed(2)})`
        ctx.arc(sx, sy, r * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      tick += 0.03 //
      const cx = w / 2
      const cy = h / 2

      mode.forEach((m) => {
        switch (m) {
          case 'text': {
            const text = 'LOADING'
            const letters = text.split('')
            const totalTime = 2.5
            const t = (tick % totalTime) / totalTime
            const letterDelay = 0.06

            ctx.save()
            ctx.translate(cx, cy)
            ctx.textAlign = 'center'
            ctx.font = 'bold 36px monospace'

            letters.forEach((ch, i) => {
              const phaseIn = i * letterDelay
              const phaseOut = 1 - (letters.length - i) * letterDelay
              let alpha = 0
              let scale = 0.5

              if (t > phaseIn && t < 0.5) {
                const p = Math.min(1, (t - phaseIn) / 0.25)
                alpha = p
                scale = 0.6 + 0.4 * p
              } else if (t >= 0.5 && t < phaseOut) {
                alpha = 1
                scale = 1
              } else if (t >= phaseOut) {
                const p = Math.min(1, (t - phaseOut) / 0.25)
                alpha = 1 - p
                scale = 1 + 0.3 * p
              }

              ctx.save()
              ctx.translate(-((letters.length - 1) * 20) / 2 + i * 20, 0)
              ctx.scale(scale, scale)
              ctx.globalAlpha = alpha
              ctx.shadowColor = color
              ctx.shadowBlur = 12 * alpha
              ctx.fillStyle = 'white'
              ctx.fillText(ch, 0, 0)
              ctx.restore()
            })

            ctx.restore()
            break
          }

          case 'circle': {
            const radius = 40
            const count = 12
            for (let i = 0; i < count; i++) {
              const angle = (Math.PI * 2 * i) / count + tick * 2
              const x = cx + Math.cos(angle) * radius
              const y = cy + Math.sin(angle) * radius
              ctx.beginPath()
              ctx.globalAlpha = ((i + tick * 10) % count) / count
              ctx.fillStyle = color
              ctx.arc(x, y, 5, 0, Math.PI * 2)
              ctx.fill()
            }
            ctx.globalAlpha = 1
            break
          }

          case 'square': {
            const size = 20 + Math.sin(tick * 3) * 5
            ctx.fillStyle = color
            ctx.fillRect(cx - size / 2, cy - size / 2, size, size)
            break
          }

          case 'bars': {
            const barCount = 5
            const barWidth = 8
            for (let i = 0; i < barCount; i++) {
              const hOffset = Math.sin(tick * 5 + i) * 20
              ctx.fillStyle = color
              ctx.fillRect(
                cx -
                (barCount * barWidth + (barCount - 1) * 5) / 2 +
                i * (barWidth + 5),
                cy - hOffset / 2,
                barWidth,
                hOffset + 30,
              )
            }
            break
          }

          case 'wave': {
            ctx.beginPath()
            ctx.moveTo(0, cy)
            for (let x = 0; x < w; x++) {
              ctx.lineTo(x, cy + Math.sin(x * 0.02 + tick * 4) * 20)
            }
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.stroke()
            break
          }

          case 'pulse': {
            const r = 20 + Math.sin(tick * 5) * 10
            ctx.beginPath()
            ctx.arc(cx, cy, r, 0, Math.PI * 2)
            ctx.strokeStyle = color
            ctx.lineWidth = 3
            ctx.stroke()
            break
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
    return () => window.removeEventListener('resize', resize)
  }, [particleCount, maxDepth, color, speed, mode])

  return <canvas ref={canvasRef} className="w-full h-full block bg-black" />
}