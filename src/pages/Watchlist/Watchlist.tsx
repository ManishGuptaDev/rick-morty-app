import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { EpisodeCard } from 'components/EpisodeCard'
import { useWatchlist } from './hooks'
import './Watchlist.scss'

const Watchlist = () => {
  const { episodes, isLoading } = useWatchlist()
  return (
    <div className='Watchlist-page'>
      {episodes.length > 0 ? (
        <div className='Watchlist-page__list'>
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <p className='Watchlist-page__empty'>Your watchlist is empty</p>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default Watchlist
