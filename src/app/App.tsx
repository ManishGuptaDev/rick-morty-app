import { BrowserRouter } from 'react-router-dom'
import Router from 'router/router'
import CssBaseline from '@mui/material/CssBaseline'

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App
