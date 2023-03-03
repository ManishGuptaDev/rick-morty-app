import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

type LayoutProps = Record<string, never>

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
