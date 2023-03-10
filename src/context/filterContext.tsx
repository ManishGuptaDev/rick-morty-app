import { createContext, useContext, useState, useEffect } from 'react'
import { useCharacterContext } from './characterContext'
import { useEpisodeContext } from './episodeContext'
import { getUniqueData } from 'Utils/helper'
import { Filter, CharactersFilterField, EpisodesFilterField, FilterFields } from 'types'

export enum FilterType {
  Character = 'CHARACTER',
  Episode = 'EPISODE',
}

export type FilterContextType = {
  filterType: FilterType
  filters: Filter[]
  selected: { [key: string]: string }
  updateFilter: (field: string, value: string) => void
}

const FilterContext = createContext<FilterContextType | null>(null)

interface Props {
  children: React.ReactNode
  type: FilterType
}

const characterFilterDefaultValues = CharactersFilterField.reduce(
  (fieldObj: { [key: string]: string }, filterField) => {
    fieldObj[filterField.field] = ''
    return fieldObj
  },
  {},
)

const episodeFilterDefaultValues = EpisodesFilterField.reduce(
  (fieldObj: { [key: string]: string }, filterField) => {
    fieldObj[filterField.field] = ''
    return fieldObj
  },
  {},
)

const FilterProvider: React.FC<Props> = ({ type, children }) => {
  const characterContext = useCharacterContext()
  const episodeContext = useEpisodeContext()

  const [filters, setFilters] = useState<Filter[]>([])

  let defaultValues: {
    [key: string]: string
  } = {}

  if (type == FilterType.Character) {
    defaultValues = characterFilterDefaultValues
  }

  if (type == FilterType.Episode) {
    defaultValues = episodeFilterDefaultValues
  }

  const [selectedValues, setSelectedValues] = useState(defaultValues)

  const createFilters = (items: { [key: string]: unknown }[], fields: FilterFields) => {
    if (items.length) {
      const filtersToSet: Filter[] = []
      const data = fields.map(({ field, type }) => {
        const prevFilters = filters.find(({ label }) => label === field)

        // To retain previous filters and keep on adding new filters
        let preValues: string[] = []
        if (prevFilters) {
          preValues = prevFilters.options.map((v) => v.value)
        }
        return {
          label: field,
          values: [
            'All',
            ...Array.from(new Set([...preValues, ...getUniqueData(items, field)])).sort(),
          ].filter((value) => value),
          type,
        }
      })

      data.forEach((fieldValues) => {
        if (fieldValues && fieldValues.values.length) {
          filtersToSet.push({
            label: fieldValues.label,
            options: fieldValues.values.map((value) => ({
              label: value as string,
              value: value === 'All' ? '' : (value as string),
              disabled: false,
            })),
            type: fieldValues.type,
          })
        }
      })

      setFilters(filtersToSet)
    }
  }

  const updateFilter = (field: string, value: string) => {
    if (selectedValues[field] !== value) {
      // update only if value has been updated
      const newSelectValues = { ...selectedValues, [field]: value }
      setSelectedValues(newSelectValues)
      if (type === FilterType.Character && characterContext) {
        characterContext.updateByFilters(newSelectValues)
      }

      if (type === FilterType.Episode && episodeContext) {
        episodeContext.updateByFilters(newSelectValues)
      }
    }
  }

  useEffect(() => {
    if (characterContext) {
      characterContext.characters &&
        createFilters(characterContext.characters, CharactersFilterField)
    }

    if (episodeContext) {
      episodeContext.episodes && createFilters(episodeContext.episodes, EpisodesFilterField)
    }
  }, [characterContext, episodeContext])

  return (
    <FilterContext.Provider
      value={{
        filterType: type,
        filters,
        selected: selectedValues,
        updateFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

const useFilterContext = () => {
  return useContext(FilterContext)
}

export { FilterProvider, useFilterContext }
