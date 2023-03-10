import { CharacterProvider } from 'context/characterContext'
import { FilterProvider, FilterType } from 'context/filterContext'
import CharactersList from './components/CharactersList'
import Pagination from './components/Pagination'
import ResponsiveFilters from 'components/ResponsiveFilters'
import './Characters.scss'

const Characters = () => {
  return (
    <div className='characters-page'>
      <CharacterProvider>
        <div className='characters-page__left-panel'>
          <FilterProvider type={FilterType.Character}>
            <ResponsiveFilters />
          </FilterProvider>
        </div>
        <div className='characters-page__right-panel'>
          <CharactersList />
          <Pagination />
        </div>
      </CharacterProvider>
    </div>
  )
}

export default Characters
