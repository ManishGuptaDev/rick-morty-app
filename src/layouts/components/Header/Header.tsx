import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'

import './Header.scss'
import logo from 'assets/images/logo.jpg'
import { useAppSelector } from 'store/hooks'

const Header = () => {
  const isloggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  console.log(isloggedIn)

  return (
    <section className='page-header'>
      <img className='page-header__logo' src={logo} alt='Logo' />
      <nav className='page-header__navigation'>
        <ul>
          <li>
            <Button variant='outlined' component={NavLink} to='/'>
              Home
            </Button>
          </li>
          <li>
            <Button variant='outlined' component={NavLink} to='/about'>
              About
            </Button>
          </li>
          <li>
            <Button variant='outlined' component={NavLink} to='/dashboard'>
              Dashboard
            </Button>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Header
