import { EpisodeCard } from 'components/EpisodeCard'
import { useWishlist } from './hooks'
import './Wishlist.scss'

const Wishlist = () => {
  const { episodes } = useWishlist()
  return (
    <div className='Wishlist-page'>
      {episodes.length > 0 ? (
        <div className='Wishlist-page__list'>
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <p className='Wishlist-page__empty'>
          Your wishlist is empty
        </p>
      )}
    </div>
  )
}

export default Wishlist
