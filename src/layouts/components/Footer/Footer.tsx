import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

import './Footer.scss'

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link to='/'>
        Rick and Morty App
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  )
}

const Footer = () => {
  return (
    <section className='page-footer'>
      <Copyright />
    </section>
  )
}

export default Footer
