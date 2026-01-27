import Container from '@/components/UIs/Container'
import SVGIcon from '@/components/UIs/SVGIcon'

export default function Welcome() {
  return (
    <Container
      className="relative w-full h-screen bg-repeating bg-repeating-body pointer-events-none z-10"
      innerClassName="relative w-full h-full flex flex-col items-center justify-center border-none"
    >
      <div className="welcome">
        <span className="uppercase">scroll down</span>
        <SVGIcon className="animate-bounce" name="mouse-scroll" size={32} />
      </div>
    </Container>
  )
}
