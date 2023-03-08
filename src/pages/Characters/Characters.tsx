

import { CharacterProvider } from 'context/characterContext'
import { FilterProvider, FilterType } from 'context/filterContext'
import CharactersList from './components/CharactersList'
import Pagination from './components/Pagination'
import Filters from './components/Filters'
import MobileFilters from './components/MobileFilters'
import './Characters.scss'
import { Mobile, Default } from 'components/Media'

const Characters = () => {
  return (
    <div className='characters-page'>
      <CharacterProvider>
        <div className='characters-page__left-panel'>
          <FilterProvider type={FilterType.Character}>
            <Mobile>
              <MobileFilters/>
            </Mobile>
            <Default>
              <Filters />
            </Default>
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
