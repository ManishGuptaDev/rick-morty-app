import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { EpisodeContextType, useEpisodeContext } from 'context/episodeContext'
import { EpisodeCard } from 'components/EpisodeCard'

const EpisodesList = () => {
  const { episodes, isLoading } = useEpisodeContext() as EpisodeContextType
  return (
    <div className='episodes-page__list'>
      {episodes && episodes.map((episode) => <EpisodeCard key={episode.id} episode={episode} />)}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default EpisodesList
