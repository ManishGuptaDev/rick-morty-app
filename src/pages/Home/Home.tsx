import { useQuery } from '@apollo/client'
import { GET_CHARACTERS } from 'graphql/queries.graphql';
import { GetCharactersQuery, GetCharactersQueryVariables } from 'graphql/__generated__/api.types';

const Home = () => {
  const {data, loading} = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GET_CHARACTERS, {
    variables: {
      page : 3
    }
  })
  console.log(loading, data?.characters?.results)
  return <div>Home Page</div>
}

export default Home
