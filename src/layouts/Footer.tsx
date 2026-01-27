import Container from '@/components/UIs/Container'

function FooterLayout() {
  return (
    <Container
      className="border-t border-neutral"
      innerClassName="plus-suffix footer-suffix"
    >
      <footer className="footer sm:footer-horizontal md:justify-between text-base-content px-6 py-10 bg-[#111512] font-medium">
        <p>Copy right {new Date().getFullYear()}</p>
      </footer>
    </Container>
  )
}

export default FooterLayout
