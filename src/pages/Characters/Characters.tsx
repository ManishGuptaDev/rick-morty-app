import Pagination from '@mui/material/Pagination'
import { CharacterCard } from 'components/CharacterCard'
import { useCharacters } from './hooks'
import './Characters.scss'


const Characters = () => {
  const { currentPage, totalPages, characters, onPageChange } = useCharacters();

  return (
    <div className='characters-page'>
      <div className='characters-page__list'>
        {characters &&
          characters
            .map((character) => <CharacterCard key={character.id} character={character} />)}
      </div>
      <div className='characters-page__pagination'>
        <Pagination page={currentPage} count={totalPages} color="primary" onChange={onPageChange} />
      </div>
    </div>
  )
}

export default Characters