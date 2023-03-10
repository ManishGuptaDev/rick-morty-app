import MuiPagination from '@mui/material/Pagination'
import { EpisodeContextType, useEpisodeContext } from 'context/episodeContext'

const Pagination = () => {
  const { currentPage, totalPages, changePage } = useEpisodeContext() as EpisodeContextType
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
