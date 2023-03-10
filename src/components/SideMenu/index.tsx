import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  toggleDrawer: (open: boolean) => void
}

const SideMenu: React.FC<Props> = ({ isOpen, children, toggleDrawer }) => {
  return (
    <div className='drawer'>
      <Drawer open={isOpen} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: '16px' }}>
          <IconButton
            aria-label='close'
            onClick={() => toggleDrawer(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ marginTop: '20px' }}>{children}</Box>
        </Box>
      </Drawer>
    </div>
  )
}

export default SideMenu
