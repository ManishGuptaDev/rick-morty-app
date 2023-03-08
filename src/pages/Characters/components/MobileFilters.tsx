import Button from '@mui/material/Button'
import { useState } from 'react'
import Filters from './Filters'
import SideMenu from 'components/SideMenu'

const MobileFilters = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open)
  }
  return (
    <div className='filter-selection-mobile'>
      <Button variant='contained' sx={{ width: '100%' }} onClick={() => toggleDrawer(true)}>
        {'Filters'}
      </Button>
      <SideMenu isOpen={isOpen} toggleDrawer={toggleDrawer}>
        <Filters />
      </SideMenu>
    </div>
  )
}

export default MobileFilters
