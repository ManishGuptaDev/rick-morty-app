import { gql } from '@apollo/client'

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        name
        image
        gender
        type
        species
      }
    }
  }
`
export const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        created
        characters {
          id
          name
          image
        }
      }
    }
  }
`

export const GET_EPISODES_BY_IDS = gql`
  query getEpisodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      air_date
      episode
      created
      characters {
        id
        name
        image
      }
    }
  }
`
export const GET_CHARACTER_BY_ID = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
      origin {
        name
        type
        dimension
        created
      }
      location {
        name
        type
        dimension
        created
      }
      episode {
        name
        episode
        air_date
        created
      }
    }
  }
`
