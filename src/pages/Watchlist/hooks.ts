import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { GET_EPISODES_BY_IDS } from 'graphql/queries.graphql'
import { useAppSelector } from 'store/hooks'
import {
  Episode,
  GetEpisodesByIdsQuery,
  GetEpisodesByIdsQueryVariables,
} from 'graphql/__generated__/api.types'

export const useWatchlist = () => {
  const apolloClient = useApolloClient()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [episodes, setEpisodes] = useState<Episode[]>([])

  const episodeIds = useAppSelector((state) => state.watchlist.episodeIds)

  useEffect(() => {
    fetchEpisodesByIds()
  }, [])

  useEffect(() => {
    if(episodes.length) {
      const newEpisodes = episodes.filter(({id}) => episodeIds.includes(id || ''))
      setEpisodes(newEpisodes)
    }
  }, [episodeIds])

  const fetchEpisodesByIds = () => {
    setLoading(true)
    if (episodeIds.length) {
      apolloClient
        .query<GetEpisodesByIdsQuery, GetEpisodesByIdsQueryVariables>({
          query: GET_EPISODES_BY_IDS,
          fetchPolicy: 'network-only',
          variables: {
            ids: [...episodeIds],
          },
        })
        .then((response) => {
          const episodes: Episode[] = response.data?.episodesByIds?.length
            ? (response.data?.episodesByIds.filter(
                (r) => typeof r === 'object' && r !== null,
              ) as Episode[])
            : []
          setEpisodes(episodes)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  return {
    isLoading,
    episodes,
  }
}
