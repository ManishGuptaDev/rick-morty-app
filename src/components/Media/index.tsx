import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'

export const Mobile: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  return isMobile ? children : null
}

export const Default: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isNotMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))
  return isNotMobile ? children : null
}
