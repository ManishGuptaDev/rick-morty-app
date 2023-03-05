import { useQuery } from '@apollo/client'
import { GET_CHARACTERS } from 'graphql/queries.graphql'
import { GetCharactersQuery, GetCharactersQueryVariables } from 'graphql/__generated__/api.types'
import banner from 'assets/images/banner.jpg'
import './Home.scss'

const Home = () => {
  const { data, loading } = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GET_CHARACTERS,
    {
      variables: {
        page: 1,
      },
    },
  )
  console.log(loading, data?.characters?.results)
  return (
    <div className='home-page'>
      <section className='home-page__banner'>
        <img className='home-page__banner__img' src={banner} alt='banner' />
      </section>
      <section className='home-page__information'>
        <div className='home-page__information__content'>
          <h2>Rick & Morty App</h2>
          <p>
            Here we get all information about Rick & Morty. We can find out everything about the
            characters and episodes
          </p>
        </div>
      </section>
      <section className='home-page__characters'>
        <div className='heading'>
          <div>Characters</div>
          <div>View All Characters</div>
        </div>
      </section>
      <section className='home-page__episodes'>
        <div className='heading'>
          <div>Episodes</div>
          <div>View All Episodes</div>
        </div>
      </section>
    </div>
  )
}

export default Home
