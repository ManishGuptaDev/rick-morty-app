import { BrowserRouter } from 'react-router-dom'
import Router from 'router/router'
import { ThemeProvider } from '@mui/material'
import MuiTheme from './muiTheme'


const App = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
