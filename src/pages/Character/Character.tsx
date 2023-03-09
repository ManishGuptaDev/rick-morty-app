import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Carousel from 'react-material-ui-carousel'
import { useCharacter } from './hooks'
import { EpisodeCard } from 'components/EpisodeCard'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useMobile, useLargeDevice } from 'hooks/media'
import { Episode } from 'graphql/__generated__/api.types'

import './Character.scss'

const Character = () => {
  const { id } = useParams()
  const { character, isLoading } = useCharacter(id)
  const isLargeDevice = useLargeDevice()
  const isMobile = useMobile()

  let sliderItems = 0
  const items: Array<React.ReactElement> = []
  let itemsToShow = 3

  if (isLargeDevice) {
    itemsToShow = 4
  } else if (isMobile) {
    itemsToShow = 1
  }

  if (character) {
    const episodes = character.episode.filter((episode) => episode != null) as Episode[]
    sliderItems = episodes.length > itemsToShow ? itemsToShow : episodes.length

    for (let i = 0; i < episodes.length; i += sliderItems) {
      if (i % sliderItems === 0) {
        items.push(
          <div className='episode-container' key={i.toString()}>
            {episodes.slice(i, i + sliderItems).map((episode) => {
              return <EpisodeCard key={episode.id} episode={episode} />
            })}
          </div>,
        )
      }
    }
  }

  return (
    <div className='character-page'>
      {!isLoading && !character && <div>Character does not exists</div>}
      {character && (
        <>
          <div className='character-page__detail'>
            <div className='character-page__detail__img'>
              <img src={character.image || ''} alt='character Image' />
            </div>
            <div className='character-page__detail__info'>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <p className='heading'>Information</p>
                  <div className='content'>
                    <span className='content__name'>Name</span>
                    <span className='content__value'>{character.name}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Status</span>
                    <span className='content__value'>{character.status}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Species</span>
                    <span className='content__value'>{character.species}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Type</span>
                    <span className='content__value'>{character.type}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Gender</span>
                    <span className='content__value'>{character.gender}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Created</span>
                    <span className='content__value'>{character.created}</span>
                  </div>
                  <p className='heading'>Origin</p>
                  <div className='content'>
                    <span className='content__name'>Name</span>
                    <span className='content__value'>{character.origin?.name}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Type</span>
                    <span className='content__value'>{character.origin?.type}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Dimension</span>
                    <span className='content__value'>{character.origin?.dimension}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Created</span>
                    <span className='content__value'>{character.origin?.created}</span>
                  </div>
                  <p className='heading'>Location</p>
                  <div className='content'>
                    <span className='content__name'>Name</span>
                    <span className='content__value'>{character.location?.name}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Type</span>
                    <span className='content__value'>{character.location?.type}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Dimension</span>
                    <span className='content__value'>{character.location?.dimension}</span>
                  </div>
                  <div className='content'>
                    <span className='content__name'>Created</span>
                    <span className='content__value'>{character.location?.created}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className='character-page__episodes'>
            <p className='heading'>{`${character.name}'s Episodes`}</p>
            <Carousel animation='slide' autoPlay={false} cycleNavigation>
              {items}
            </Carousel>
          </div>
        </>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default Character
