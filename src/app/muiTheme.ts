import { createTheme } from '@mui/material'

const MuiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
    },
  },
})

export default MuiTheme
