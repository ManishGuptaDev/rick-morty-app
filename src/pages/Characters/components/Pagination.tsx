import MuiPagination from '@mui/material/Pagination'
import { CharacterContextType, useCharacterContext } from 'context/characterContext'

const Pagination = () => {
  const { currentPage, totalPages, changePage } = useCharacterContext() as CharacterContextType
  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    changePage(value)
    event.preventDefault()
  }

  return (
    <div className='characters-page__pagination'>
      <MuiPagination
        page={currentPage}
        count={totalPages}
        color='primary'
        onChange={onPageChange}
      />
    </div>
  )
}

export default Pagination
