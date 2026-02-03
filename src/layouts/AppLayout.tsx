import React, { type ReactNode } from 'react'
import FooterLayout from './Footer'
import HeaderLayout from './Header'

interface LayoutProps {
  children: ReactNode
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-repeating bg-repeating-body">
      <HeaderLayout />
      <main className="flex-1 -mt-24">{children}</main>
      <FooterLayout />
    </div>
  )
}

export default AppLayout
