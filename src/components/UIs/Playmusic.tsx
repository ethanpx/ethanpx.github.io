import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'

import { randomFromToInt } from '@/helpers/utils'

import CD from '@/static/images/music/cd.png'
import CD_1 from '@/static/images/music/cd-1.png'
import CD_2 from '@/static/images/music/cd-2.png'
import CD_3 from '@/static/images/music/cd-3.png'
import WAND from '@/static/images/music/wand.png'

import chi from '@/static/images/music/chi.png'
import doImg from '@/static/images/music/do.png'
import fa from '@/static/images/music/fa.png'
import la from '@/static/images/music/la.png'
import re from '@/static/images/music/re.png'
import { useSystemStore } from '@/hooks/useStore'

const imgs = [chi, doImg, fa, la, re]
// const playlist = [
//   'https://cdn.pixabay.com/audio/2025/08/27/audio_a24ae26cff.mp3',
//   'https://cdn.pixabay.com/audio/2024/11/11/audio_eac057e2a0.mp3',
//   'https://cdn.pixabay.com/audio/2025/09/18/audio_971b21bebc.mp3',
//   'https://cdn.pixabay.com/audio/2025/09/06/audio_60181150e4.mp3',
//   'https://cdn.pixabay.com/audio/2025/03/22/audio_f3e01f1a95.mp3',
//   'https://cdn.pixabay.com/audio/2024/05/23/audio_245f6b7dc2.mp3',
//   'https://cdn.pixabay.com/audio/2025/06/13/audio_1326194691.mp3',
//   'https://cdn.pixabay.com/audio/2024/09/11/audio_be8cc5c400.mp3',
//   'https://cdn.pixabay.com/audio/2025/04/09/audio_70382a18e8.mp3',
//   'https://cdn.pixabay.com/audio/2025/04/22/audio_5169b024c1.mp3',
//   'https://cdn.pixabay.com/audio/2025/07/25/audio_4197532a6f.mp3',
//   'https://cdn.pixabay.com/audio/2025/09/01/audio_6a5c316e8a.mp3',
// ]

// christmas playlist
const playlist = [
  'https://cdn.pixabay.com/audio/2025/11/06/audio_b90b951161.mp3',
  'https://cdn.pixabay.com/audio/2025/10/28/audio_b06293305b.mp3',
  'https://cdn.pixabay.com/audio/2025/11/11/audio_dfa736196d.mp3',
  'https://cdn.pixabay.com/audio/2025/11/05/audio_680009f825.mp3',
  'https://cdn.pixabay.com/audio/2025/11/04/audio_b6448609e5.mp3',
  'https://cdn.pixabay.com/audio/2025/11/06/audio_45d26dc5f9.mp3',
  'https://cdn.pixabay.com/audio/2024/10/21/audio_24783acacb.mp3',
  'https://cdn.pixabay.com/audio/2025/11/04/audio_a8d16a7fd1.mp3',
  'https://cdn.pixabay.com/audio/2024/11/10/audio_5946b0df1b.mp3',
  'https://cdn.pixabay.com/audio/2024/10/14/audio_3f09493301.mp3',
  'https://cdn.pixabay.com/audio/2025/10/29/audio_153a2fe292.mp3',
  'https://cdn.pixabay.com/audio/2023/12/20/audio_e3bd2bd998.mp3',
]

interface FloatingNote {
  id: number
  src: string
  xPath: number[]
  yPath: number[]
  rotate: number
  duration: number
}

function FloatingMusic({
  start = false,
  spawnRate = 1200,
  maxPerSpawn = 1,
  speedFactor = 1.5, // tốc độ bay: 1 = chuẩn, >1 chậm hơn, <1 nhanh hơn
}: {
  start?: boolean
  spawnRate?: number
  maxPerSpawn?: number
  speedFactor?: number
}) {
  const [notes, setNotes] = useState<FloatingNote[]>([])

  useLayoutEffect(() => {
    if (!start) return

    const spawn = () => {
      const newNotes: FloatingNote[] = []
      const count = Math.floor(Math.random() * maxPerSpawn) + 1

      for (let i = 0; i < count; i++) {
        const totalFrames = 24
        const pathX: number[] = []
        const pathY: number[] = []

        const horizontalDistance = -(80 + Math.random() * 80) // từ phải sang trái
        const verticalDistance = -(180 + Math.random() * 120)

        const zigzagAmp = 6 + Math.random() * 4
        const zigzagFreq = 3 + Math.random() * 2

        for (let t = 0; t < totalFrames; t++) {
          const progress = t / (totalFrames - 1)

          let x: number
          let y: number

          if (progress < 0.4) {
            // 0% → 40%: đi ngang + hơi xéo lên
            x = horizontalDistance * progress
            y = -progress * 30 // xéo nhẹ lên khi đi ngang
            // zigzag theo Y
            y += Math.sin(progress * zigzagFreq * Math.PI * 2) * zigzagAmp
          } else if (progress < 0.65) {
            // 40% → 65%: cong lên (x giảm chậm, y bắt đầu tăng nhanh)
            const localP = (progress - 0.4) / 0.25
            x = horizontalDistance * (0.4 + localP * 0.3)
            y = -30 - localP * 60
            // zigzag theo chéo (x + y)
            const zigzag =
              Math.sin(progress * zigzagFreq * Math.PI * 2) * (zigzagAmp * 0.7)
            x += zigzag * 0.5
            y += zigzag * 0.5
          } else {
            // 65% → 100%: đi thẳng lên
            const localP = (progress - 0.65) / 0.35
            x = horizontalDistance * 0.7 // giữ x cố định
            y = -90 + verticalDistance * localP
            // zigzag theo Y
            y +=
              Math.sin(progress * zigzagFreq * Math.PI * 2) * (zigzagAmp * 0.8)
          }

          pathX.push(x)
          pathY.push(y)
        }

        const rotate = (Math.random() - 0.5) * 30
        const duration = (5 + Math.random() * 2) * speedFactor

        newNotes.push({
          id: Date.now() + Math.random(),
          src: imgs[Math.floor(Math.random() * imgs.length)],
          xPath: pathX,
          yPath: pathY,
          rotate,
          duration,
        })
      }

      setNotes((prev) => [...prev, ...newNotes])
    }

    spawn()
    const interval = setInterval(spawn, spawnRate)
    return () => clearInterval(interval)
  }, [start, spawnRate, maxPerSpawn, speedFactor])

  const handleComplete = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.img
            key={note.id}
            src={note.src}
            className="absolute w-8 h-8"
            initial={{
              opacity: 1,
              scale: 0.3,
              y: 0,
              x: 0,
              rotate: 0,
            }}
            animate={{
              opacity: 0,
              scale: 1,
              y: note.yPath,
              x: note.xPath,
              rotate: note.rotate,
            }}
            transition={{
              duration: note.duration,
              ease: 'linear', // smooth hoàn toàn
            }}
            onAnimationComplete={() => handleComplete(note.id)}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function PlayMusic() {
  const { audio, setAudio } = useSystemStore()
  const playMusicRef = useRef<(() => void) | null>(null)

  const playMusic = useCallback(() => {
    if (audio) {
      audio.pause()
      setAudio(undefined)
      return
    }

    const i = randomFromToInt(0, playlist.length - 1)
    const newAudio = new Audio(playlist[i])
    setAudio(newAudio)
    newAudio.play()
    newAudio.onended = () => {
      playMusicRef.current?.()
    }
  }, [audio, setAudio])

  useEffect(() => {
    playMusicRef.current = playMusic
  }, [playMusic])

  return (
    <div
      className="bg-white p-0.5 rounded-lg cursor-pointer"
      onClick={playMusic}
    >
      <div className="bg-[#E62522] p-0.5 border border-black relative w-full h-full flex gap-1 flex-row rounded-lg pr-3 select-none">
        <div className="relative w-6 h-6 md:w-8 md:h-8 pointer-events-none">
          <img
            src={CD}
            className={clsx('w-full h-full object-contain cursor-pointer', {
              'animate-spin [animation-duration:3s]': !!audio,
            })}
          />
          <img
            src={CD_1}
            className="absolute top-0 left-0 w-6/12 h-auto object-contain cursor-pointer"
          />
          <img
            src={CD_2}
            className="absolute top-0 right-0 w-6/12 h-auto object-contain cursor-pointer"
          />
          <img
            src={CD_3}
            className="absolute bottom-0 left-0 w-7/12 h-auto object-contain cursor-pointer"
          />
        </div>
        <div />
        <img
          src={WAND}
          className={clsx(
            'absolute top-0.5 right-0.5 w-5 md:w-6 h-auto object-contain origin-top-right transition-all pointer-events-none',
            { 'rotate-6': !!audio, '-rotate-15': !audio },
          )}
        />
        <div className="absolute w-full h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <FloatingMusic start={!!audio} />
        </div>
      </div>
    </div>
  )
}
