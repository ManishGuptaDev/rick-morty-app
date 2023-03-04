import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

import { Header, Footer } from './components'

import './Layout.scss'

type LayoutProps = Record<string, never>

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Box className='container'>
      <Header />
      <main className='container__main-content'>
        <Outlet />
      </main>
      <Footer />
    </Box>
  )
}

export default Layout
