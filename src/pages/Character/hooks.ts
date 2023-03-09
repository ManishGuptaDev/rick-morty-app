import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { GET_CHARACTER_BY_ID } from 'graphql/queries.graphql'
import {
  Character,
  GetCharacterQuery,
  GetCharacterQueryVariables,
} from 'graphql/__generated__/api.types'

export const useCharacter = (id?: string) => {
  const apolloClient = useApolloClient()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [character, setCharacter] = useState<Character | null>(null)

  useEffect(() => {
    const isNumber = !isNaN(Number(id))
    if (isNumber) {
      fetchCharacterById(Number(id))
    }
  }, [id])

  const fetchCharacterById = (characterId: number) => {
    setLoading(true)
    apolloClient
      .query<GetCharacterQuery, GetCharacterQueryVariables>({
        query: GET_CHARACTER_BY_ID,
        fetchPolicy: 'network-only',
        variables: {
          id: characterId.toString(),
        },
      })
      .then((response) => {
        // response.data.character
        if (response.data.character) {
          const character: Character = {
            ...response.data.character,
            location: {
              ...response.data.character.location,
              residents: [],
            },
            origin: {
              ...response.data.character.origin,
              residents: [],
            },
            episode: response.data.character.episode.map((e) => ({
              ...e,
              characters: [],
            })),
          }

          setCharacter(character)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return {
    isLoading,
    character,
  }
}
