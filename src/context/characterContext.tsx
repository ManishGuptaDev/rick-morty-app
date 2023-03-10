import React, { createContext, useContext, useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { GET_CHARACTERS } from 'graphql/queries.graphql'
import {
  Character,
  FilterCharacter,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from 'graphql/__generated__/api.types'

export type CharacterContextType = {
  characters?: Character[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  changePage: (page: number) => void
  fetchCharacters: (pageNumber: number, filters: FilterCharacter) => void
  updateByFilters: (filter: FilterCharacter) => void
}

const CharacterContext = createContext<CharacterContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const CharacterProvider: React.FC<Props> = ({ children }) => {
  const apolloClient = useApolloClient()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filters, setFilters] = useState<FilterCharacter>({
    gender: '',
    name: '',
    species: '',
    status: '',
    type: '',
  })
  const [totalPages, setTotalPages] = useState(1)
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    fetchCharacters(1, filters)
  }, [])

  const fetchCharacters = (pageNumber: number, filter: FilterCharacter) => {
    setLoading(true)
    apolloClient
      .query<GetCharactersQuery, GetCharactersQueryVariables>({
        query: GET_CHARACTERS,
        fetchPolicy: 'network-only',
        variables: {
          page: pageNumber,
          filter: filter,
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
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const changePage = (value: number) => {
    setPage(value)
    fetchCharacters(value, filters)
  }

  const updateByFilters = (filter: FilterCharacter) => {
    setFilters(filter)
    setPage(1) // Setting Page to 1
    fetchCharacters(1, filter)
  }

  return (
    <CharacterContext.Provider
      value={{
        changePage,
        currentPage: page,
        fetchCharacters,
        isLoading,
        totalPages,
        characters,
        updateByFilters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

// custom hooks
const useCharacterContext = () => {
  return useContext(CharacterContext)
}

export { CharacterProvider, useCharacterContext }
