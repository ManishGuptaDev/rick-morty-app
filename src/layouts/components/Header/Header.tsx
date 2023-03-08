import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { showLoginForm, logout } from 'store/authSlice'
import { Mobile, Default } from 'components/Media'
import SideMenu from 'components/SideMenu'

import './Header.scss'
import logo from 'assets/images/logo.jpg'

const renderNavigationMenu = () => {
  return (
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
  )
}

const Header = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const userName = useAppSelector((state) => state.auth.user.userName)

  React.useEffect(() => {
    // execute on location change
    // close the sideMenu if its open
    if(isSideMenuOpen) {
      setIsSideMenuOpen(false)
    }
  }, [location])

  // User Profile Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleImgClick = () => {
    navigate('/')
  }

  const handleLoginClick = () => {
    dispatch(showLoginForm())
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose() // close the menu
    navigate('/') // Navigate to home page
  }

  const toggleDrawer = (open: boolean) => {
    setIsSideMenuOpen(open)
  }

  return (
    <section className='page-header'>
      <Mobile>
        <div className='page-header__hamburger '>
          <IconButton
            size='large'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SideMenu isOpen={isSideMenuOpen} toggleDrawer={toggleDrawer}>
            {renderNavigationMenu()}
          </SideMenu>
        </div>
      </Mobile>
      <img className='page-header__logo' src={logo} alt='Logo' onClick={handleImgClick} />
      <Default>{renderNavigationMenu()}</Default>

      <div className='page-header__login'>
        {!isLoggedIn ? (
          <Button variant='outlined' onClick={handleLoginClick}>
            Login
          </Button>
        ) : (
          <>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant='text'
            >
              {`Welcome ${userName}`}
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose} component={NavLink} to='/watchlist'>
                My Watchlist
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </section>
  )
}

export default Header
