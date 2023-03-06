import { NavLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useAppDispatch } from 'store/hooks'
import { showLoginForm } from 'store/authSlice'

import './Header.scss'
import logo from 'assets/images/logo.jpg'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleImgClick = () => {
    navigate('/')
  }

  const handleLoginClick = () => {
    dispatch(showLoginForm())
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
        <Button variant='outlined' onClick={handleLoginClick}>
          Login
        </Button>
      </div>
    </section>
  )
}

export default Header
