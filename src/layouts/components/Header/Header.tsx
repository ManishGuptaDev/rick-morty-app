import { NavLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

import './Header.scss'
import logo from 'assets/images/logo.jpg'
import { useAppSelector } from 'store/hooks'

const Header = () => {
  const isloggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const navigate = useNavigate()

  console.log(isloggedIn)

  const handleImgClick = () => {
    navigate('/')
  }

  return (
    <section className='page-header'>
      <img className='page-header__logo' src={logo} alt='Logo' onClick={handleImgClick} />
      <nav className='page-header__navigation'>
        <ul>
          <li>
            <Button variant='outlined' component={NavLink} to='/characters'>
              Characters
            </Button>
          </li>
          <li>
            <Button variant='outlined' component={NavLink} to='/episodes'>
              Episodes
            </Button>
          </li>
        </ul>
      </nav>
      <div className='page-header__login'>
        <Button variant='outlined'>Login</Button>
      </div>
    </section>
  )
}

export default Header
