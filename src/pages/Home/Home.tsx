import { useQuery } from '@apollo/client'
import { GET_CHARACTERS, GET_EPISODES } from 'graphql/queries.graphql'
import {
  Character,
  Episode,
  GetCharactersQuery,
  GetCharactersQueryVariables,
  GetEpisodesQuery,
  GetEpisodesQueryVariables,
} from 'graphql/__generated__/api.types'
import banner from 'assets/images/banner.jpg'
import './Home.scss'
import { CharacterCard } from 'components/CharacterCard'
import { EpisodeCard } from 'components/EpisodeCard'
import Typography from '@mui/material/Typography'

const Home = () => {
  const { data: charactersData, loading: charactersLoading } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: {
      page: 1,
    },
  })

  const characters: Character[] = charactersData?.characters?.results?.length
    ? (charactersData.characters.results.filter(
        (r) => typeof r === 'object' && r !== null,
      ) as Character[])
    : []

  const { data: episodesData, loading: episodesLoading } = useQuery<
    GetEpisodesQuery,
    GetEpisodesQueryVariables
  >(GET_EPISODES, {
    variables: {
      page: 1,
    },
  })

  const episodes: Episode[] = episodesData?.episodes?.results?.length
    ? (episodesData.episodes.results.filter(
        (r) => typeof r === 'object' && r !== null,
      ) as Episode[])
    : []

  return (
    <div className='home-page'>
      <section className='home-page__banner'>
        <img className='home-page__banner__img' src={banner} alt='banner' />
      </section>
      <section className='home-page__information'>
        <div className='home-page__information__content'>
          <h2>Rick & Morty App</h2>
          <p>
            Here we get all information about Rick & Morty. Find out everything about the
            characters and the episodes.
          </p>
        </div>
      </section>
      <section className='home-page__characters'>
        <div className='heading'>
          <Typography variant='h4' gutterBottom>
            Characters
          </Typography>
          <div>View All Characters</div>
        </div>
        {charactersLoading ? (
          <div className='loader'>loading...</div>
        ) : (
          <div className='list'>
            {characters &&
              characters
                .slice(0, 4)
                .map((character) => <CharacterCard key={character.id} character={character} />)}
          </div>
        )}
      </section>
      <section className='home-page__episodes'>
        <div className='heading'>
          <Typography variant='h4' gutterBottom>
            Episodes
          </Typography>
          <div>View All Episodes</div>
        </div>
        {episodesLoading ? (
          <div className='loader'>loading...</div>
        ) : (
          <div className='list'>
            {episodes &&
              episodes
                .slice(0, 4)
                .map((episode) => <EpisodeCard key={episode.id} episode={episode} />)}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
