import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { GET_CHARACTERS } from 'graphql/queries.graphql'
import {
  Character,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from 'graphql/__generated__/api.types'

export const useCharacters = () => {
  const apolloClient = useApolloClient()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = () => {
    setLoading(true)
    apolloClient
      .query<GetCharactersQuery, GetCharactersQueryVariables>({
        query: GET_CHARACTERS,
        fetchPolicy: 'network-only',
        variables: {
          page,
        },
      })
      .then((response) => {
        const characters: Character[] = response.data?.characters?.results?.length
          ? (response.data.characters.results.filter(
              (r) => typeof r === 'object' && r !== null,
            ) as Character[])
          : []
        setTotalPages(response.data?.characters?.info?.pages || 1)
        setCharacters(characters)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    fetchCharacters()
    event.preventDefault()
  }

  return {
    isLoading,
    characters,
    currentPage: page,
    totalPages,
    onPageChange,
  }
}
