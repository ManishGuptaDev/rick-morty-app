import React, { createContext,useContext, useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { GET_EPISODES } from 'graphql/queries.graphql'
import {
  Episode,
  FilterEpisode,
  GetEpisodesQuery,
  GetEpisodesQueryVariables,
} from 'graphql/__generated__/api.types'

export type EpisodeContextType = {
  episodes?: Episode[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  changePage: (page: number) => void
  fetchEpisodes: (pageNumber: number, filters: FilterEpisode) => void
  updateByFilters: (filter: FilterEpisode) => void
}

const EpisodeContext = createContext<EpisodeContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const EpisodeProvider: React.FC<Props> = ({ children }) => {
  const apolloClient = useApolloClient()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filters, setFilters] = useState<FilterEpisode>({
    name: '',
    episode: ''
  })
  const [totalPages, setTotalPages] = useState(1)
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    fetchEpisodes(1, filters)
  }, [])

  const fetchEpisodes = (pageNumber: number, filter: FilterEpisode ) => {
    setLoading(true)
    apolloClient
      .query<GetEpisodesQuery, GetEpisodesQueryVariables>({
        query: GET_EPISODES,
        fetchPolicy: 'network-only',
        variables: {
          page: pageNumber,
          filter: filter
        },
      })
      .then((response) => {
        const episodes: Episode[] = response.data?.episodes?.results?.length
          ? (response.data.episodes.results.filter(
              (r) => typeof r === 'object' && r !== null,
            ) as Episode[])
          : []
        setTotalPages(response.data?.episodes?.info?.pages || 1)
        setEpisodes(episodes)
        setLoading(false)
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const changePage = (value: number) => {
    setPage(value)
    fetchEpisodes(value, filters)
  }

  const updateByFilters = (filter: FilterEpisode) => {
    setFilters(filter)
    setPage(1) // Setting Page to 1
    fetchEpisodes(1, filter)
  }

  return (
    <EpisodeContext.Provider
      value={{
        changePage,
        currentPage: page,
        fetchEpisodes,
        isLoading,
        totalPages,
        episodes,
        updateByFilters
      }}
    >
      {children}
    </EpisodeContext.Provider>
  )
}


// custom hooks
const useEpisodeContext = () => {
  return useContext(EpisodeContext);
};


export { EpisodeProvider, useEpisodeContext };