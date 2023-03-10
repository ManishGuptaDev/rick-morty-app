import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'

export const useMobile = () => {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
}

export const useLargeDevice = () => {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.up('xl'))
}
