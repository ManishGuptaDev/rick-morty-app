import { useQuery } from '@apollo/client'
import { EpisodeCard } from 'components/EpisodeCard'
import { GET_EPISODES } from 'graphql/queries.graphql'
import {
  Episode,
  GetEpisodesQuery,
  GetEpisodesQueryVariables,
} from 'graphql/__generated__/api.types'

import './Episodes.scss'

const Episodes = () => {
  const { data } = useQuery<GetEpisodesQuery, GetEpisodesQueryVariables>(GET_EPISODES, {
    variables: {
      page: 1,
    },
  })

  const episodes: Episode[] = data?.episodes?.results?.length
    ? (data.episodes.results.filter((r) => typeof r === 'object' && r !== null) as Episode[])
    : []

  return (
    <div className='episodes-page'>
      <div className='episodes-page__list'>
        {episodes &&
          episodes
            .map((episode) => <EpisodeCard key={episode.id} episode={episode} />)}
      </div>
    </div>
  )
}

export default Episodes
