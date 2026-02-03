import Container from '@/components/UIs/Container'

import WheelSkills from './WheelSkills'
import Welcome from './Welcome'
import Projects from './projects/Page'
import PlayMusic from '@/components/UIs/Playmusic'

export default function HomePage() {
  return (
    <Container>
      <div className="flex flex-col gap-1">
        <Welcome />
        <WheelSkills />
        <Projects />
        <div className="bg-base-100 min-h-dvh"></div>
      </div>
      <div className="fixed right-0 bottom-1/5 translate-x-1/2 hover:translate-x-0 transition-all z-50">
        <PlayMusic />
      </div>
    </Container>
  )
}
