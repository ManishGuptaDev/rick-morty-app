export interface Filter {
  label: string
  type:FiltersTypes
  options: {
    label: string
    value: string
    disabled?: boolean
  }[]
}

export enum FiltersTypes {
  SELECT,
  AUTOCOMPLETE
}

export type FilterFields = {
  field: string
  type: FiltersTypes
}[]

export const CharactersFilterField: FilterFields = [
  { field: 'name', type: FiltersTypes.AUTOCOMPLETE },
  { field: 'status', type: FiltersTypes.SELECT },
  { field: 'species', type: FiltersTypes.SELECT },
  { field: 'type', type: FiltersTypes.SELECT },
  { field: 'gender', type: FiltersTypes.SELECT }
]

export const EpisodesFilterField: FilterFields = [
  { field: 'name', type: FiltersTypes.AUTOCOMPLETE },
  { field: 'episode', type: FiltersTypes.SELECT },
]
