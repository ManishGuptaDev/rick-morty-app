import { createContext, useContext, useState, useEffect } from 'react'
import { useCharacterContext } from './characterContext'
import { getUniqueData } from 'Utils/helper'
import { Filter, CharactersFilterField } from 'types'

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

const FilterProvider: React.FC<Props> = ({ type, children }) => {
  const characterContext = useCharacterContext()
  const [filters, setFilters] = useState<Filter[]>([])

  let defaultValues: {
    [key: string]: string
  } = {}

  if (type == FilterType.Character) {
    defaultValues = characterFilterDefaultValues
  }

  const [selectedValues, setSelectedValues] = useState(defaultValues)

  const setCharactersFilters = () => {
    if (characterContext) {
      const characters = characterContext.characters
      const charactersFilters: Filter[] = []
      if (characters && characters.length) {
        const data = CharactersFilterField.map(({ field, type }) => {
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
              ...Array.from(new Set([...preValues, ...getUniqueData(characters, field)])).sort(),
            ].filter((value) => value),
            type,
          }
        })

        data.forEach((fieldValues) => {
          if (fieldValues && fieldValues.values.length) {
            charactersFilters.push({
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

        setFilters(charactersFilters)
      }
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
    }
  }

  useEffect(() => {
    setCharactersFilters()
  }, [characterContext])

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
