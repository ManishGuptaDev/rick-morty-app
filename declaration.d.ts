import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true // adds the `xxl` breakpoint
  }
}
