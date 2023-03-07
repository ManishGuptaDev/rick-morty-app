import { useMemo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia/CardMedia'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Avatar from '@mui/material/Avatar'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addToWatchlist, removeFromWatchlist } from 'store/watchlistSlice'
import { showLoginForm } from 'store/authSlice'
import { Episode } from 'graphql/__generated__/api.types'
import episode1 from 'assets/images/episode1.jpg'
import episode2 from 'assets/images/episode2.jpg'
import episode3 from 'assets/images/episode3.jpg'
import episode4 from 'assets/images/episode4.jpg'
import episode5 from 'assets/images/episode5.jpg'
import './EpisodeCard.scss'

interface Props {
  episode: Episode
}

const images = [episode1, episode2, episode3, episode4, episode5]

const getRandomImg = () => {
  const randomNumber = Math.floor(Math.random() * images.length)
  return images[randomNumber]
}

const EpisodeCard: React.FC<Props> = ({ episode }) => {
  const dispatch = useAppDispatch()
  const episodeIds = useAppSelector((state) => state.watchlist.episodeIds)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const isInWatchlist = episodeIds.includes(episode?.id || '')

  const memoizedImgSrc = useMemo(() => getRandomImg(),[])

  const handleWatchlistIconClick = () => {
    if(isLoggedIn) {
      isInWatchlist ? dispatch(removeFromWatchlist(episode?.id)) : dispatch(addToWatchlist(episode?.id))
    }else {
      dispatch(showLoginForm())
    }
  }

  return (
    <div className='episode-card'>
      <Card>
        <CardMedia component='img' height='250' image={memoizedImgSrc} alt='image' />
        <CardContent>
          <Typography color='text.secondary' gutterBottom component='div'>
            <div className='episode-card__heading'>
              {episode.episode}
              <IconButton aria-label='add to favorites' onClick={handleWatchlistIconClick}>
                <FavoriteIcon
                  className={`episode-card__watchlist-icon ${
                    isInWatchlist ? 'episode-card__watchlist-icon--red' : ''
                  }`}
                />
              </IconButton>
            </div>
          </Typography>
          <Typography variant='h5' component='div'>
            {episode.name}
          </Typography>
          <Typography variant='body2'>Air Date: {episode.air_date}</Typography>
          <Typography variant='body2' component='div'>
            Characters
            <div className='episode-card__cast-avatar'>
              {episode.characters.map((character) => (
                <div key={character?.id}>
                  {character?.image && <Avatar src={character.image} />}
                </div>
              ))}
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default EpisodeCard
