import { CharacterCard } from 'components/CharacterCard'
import { CharacterContextType, useCharacterContext } from 'context/characterContext'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const CharactersList = () => {
  const { characters, isLoading } = useCharacterContext() as CharacterContextType
  return (
    <div className='characters-page__list'>
      {characters &&
        characters.map((character) => <CharacterCard key={character.id} character={character} />)}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default CharactersList
