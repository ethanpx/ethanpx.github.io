import Container from '@/components/UIs/Container'

import WheelSkills from './WheelSkills'
import Welcome from './Welcome'
import Projects from './projects/Page'

export default function HomePage() {
  return (
    <Container>
      <div className="flex flex-col gap-1">
        <Welcome />
        <WheelSkills />
        <Projects />
        <div className="bg-base-100 min-h-[300vh]"></div>
      </div>
    </Container>
  )
}
