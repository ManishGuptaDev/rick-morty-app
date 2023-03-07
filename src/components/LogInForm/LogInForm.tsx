import {useRef } from 'react'
import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { closeLoginForm, login } from 'store/authSlice'
import toast from 'react-hot-toast';
import './LogInForm.scss'

const LogInForm = () => {
  const textRef = useRef<TextFieldProps>();
  const dispatch = useAppDispatch()
  const isLoginFormOpen = useAppSelector((state) => state.auth.isLoginFormOpen)

  const handleClose = () => {
    dispatch(closeLoginForm())
  }

  const handleLogin = () => {
    toast.success('You are successfully logged in!');
    dispatch(login(textRef.current?.value))
  }

  return (
    <div className='login-popup'>
      <Dialog open={isLoginFormOpen} onClose={handleClose}>
        <DialogTitle>
          Sign In
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='User Name'
            type='text'
            fullWidth
            variant='outlined'
            required
            inputRef={textRef}
          />
          <TextField
            margin='dense'
            id='password'
            label='password'
            type='password'
            fullWidth
            required
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleLogin}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LogInForm
