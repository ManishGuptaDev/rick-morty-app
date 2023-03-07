import { EpisodeCard } from 'components/EpisodeCard'
import { useWatchlist } from './hooks'
import './Watchlist.scss'

const Watchlist = () => {
  const { episodes } = useWatchlist()
  return (
    <div className='Watchlist-page'>
      {episodes.length > 0 ? (
        <div className='Watchlist-page__list'>
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <p className='Watchlist-page__empty'>
          Your watchlist is empty
        </p>
      )}
    </div>
  )
}

export default Watchlist
