import { useState } from 'react'
import Button from '@mui/material/Button'
import SideMenu from 'components/SideMenu'
import { Mobile, Default } from 'components/Media'
import Filters from 'components/Filters'

const ResponsiveFilters: React.FC<Record<string, never>> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open)
  }
  return (
    <div className='filters-container'>
      <Mobile>
        <>
          <Button variant='contained' sx={{ width: '100%' }} onClick={() => toggleDrawer(true)}>
            {'Filters'}
          </Button>
          <SideMenu isOpen={isOpen} toggleDrawer={toggleDrawer}>
            <Filters />
          </SideMenu>
        </>
      </Mobile>
      <Default>
        <Filters />
      </Default>
    </div>
  )
}

export default ResponsiveFilters
