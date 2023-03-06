import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { closeLoginForm } from 'store/authSlice';
import './LogInForm.scss'


const LogInForm = () => {
  const dispatch = useAppDispatch()
  const isLoginFormOpen = useAppSelector((state) => state.auth.isLoginFormOpen)

  const handleClose = () => {
    dispatch(closeLoginForm())
  };

  return (
    <div className="login-popup">
      <Dialog open={isLoginFormOpen} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LogInForm