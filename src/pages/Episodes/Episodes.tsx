import { EpisodeProvider } from 'context/episodeContext'
import { FilterProvider, FilterType } from 'context/filterContext'
import ResponsiveFilters from 'components/ResponsiveFilters'
import EpisodesList from './components/EpisodesList'
import Pagination from './components/Pagination'

import './Episodes.scss'

const Episodes = () => {
  return (
    <div className='episodes-page'>

      <EpisodeProvider>
        <div className='episodes-page__left-panel'>
          <FilterProvider type={FilterType.Episode}>
            <ResponsiveFilters/>
          </FilterProvider>
        </div>
        <div className='episodes-page__right-panel'>
          <EpisodesList />
          <Pagination />
        </div>
      </EpisodeProvider>
    </div>
  )
}

export default Episodes
