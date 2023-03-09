import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useCharacter } from './hooks'
import './Character.scss'

const Character = () => {
  const { id } = useParams()
  const { character, isLoading } = useCharacter(id)
  return (
    <div className='character-page'>
      {!character && <div>Character does not exists</div>}
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
          </div>
        </>
      )}
    </div>
  )
}

export default Character
