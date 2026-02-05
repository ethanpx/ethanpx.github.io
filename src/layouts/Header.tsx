import { useRef } from 'react'
import { Link } from 'react-router'

import Container from '@/components/UIs/Container'
import SVGIcon from '@/components/UIs/SVGIcon'

import { AVATAR_URL } from '@/constant'
import { useStickyObserver } from '@/hooks/useSticky'
import { useFakeSticky } from '@/hooks/useFakeSticky'

function HeaderLayout() {
  const parentElmRef = useRef<HTMLDivElement | null>(null)
  const elmRef = useRef<HTMLDivElement | null>(null)
  useStickyObserver(elmRef, 'header-sticky')
  useFakeSticky(parentElmRef, -5)

  return (
    <Container
      ref={parentElmRef}
      className="border-b border-neutral z-999"
      innerClassName="plus-suffix header-suffix"
    >
      <div ref={elmRef} className="h-container">
        <div className="h-helo-text">
          <p className="text-xl md:text-2xl text-center">
            Welcome to my personal profile page.
          </p>
        </div>

        <div className="h-info">
          <img className="h-avatar" src={AVATAR_URL} alt="avatar" />
          <div className="h-desc flex-col">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-xs md:text-sm">
                Ethan (Thien Nguyen)
              </p>
              <span className="text-[10px] md:text-xs">
                Front End Developer
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center text-xs md:text-sm">
              <div className="flex flex-row gap-2">
                <a href="tel:+84357395494">☎️</a>
                <a href="mailto:thienit.qng@gmail.com">📮</a>
              </div>
              <div className="bg-secondary w-[0.5px] h-full" />
              <div className="flex flex-row gap-1 text-[10px] md:text-xs font-medium items-center">
                <div className="w-1 self-stretch bg-base-100" />
                <Link
                  className="flex flex-row gap-1 px-1 rounded-xs bg-secondary text-neutral"
                  to="https://github.com/ethanpx"
                  target="_blank"
                >
                  <SVGIcon
                    className="scale-95 md:scale-100"
                    size={14}
                    name="github"
                  />
                  ethanpx
                </Link>
                <span className="font-light">|</span>
                <Link
                  className="flex flex-row gap-1 px-1 rounded-xs bg-sky-200 text-neutral"
                  to="https://www.linkedin.com/in/vtn-fe/"
                  target="_blank"
                >
                  <SVGIcon
                    className="scale-95 md:scale-100"
                    size={12}
                    name="linkedin"
                  />
                  vtn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HeaderLayout
