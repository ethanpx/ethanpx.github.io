import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const FixedPortal = ({ children }: PropsWithChildren) => {
  const el = document.getElementById('fixed-root')!
  return createPortal(children, el)
}
