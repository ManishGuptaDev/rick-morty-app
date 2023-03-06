import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Toaster } from 'react-hot-toast'

import { Header, Footer } from './components'
import { LogInForm } from 'components/LogInForm'

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
      <LogInForm />
      <Toaster
        containerStyle={{ zIndex: 9999999 }}
        position='bottom-right'
        toastOptions={{
          duration: 2000,
        }}
      />
    </Box>
  )
}

export default Layout
