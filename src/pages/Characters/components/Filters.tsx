import { FilterCard } from 'components/FilterCard'
import { useFilterContext, FilterContextType } from 'context/filterContext'

const Filters = () => {
  const { filters, selected, updateFilter } = useFilterContext() as FilterContextType

  const handleChange = (title: string, value: string) => {
    updateFilter(title, value)
  }

  return (
    <div className='filter-selection'>
      {filters.map((filter, index) => (
        <FilterCard
          key={`${filter.label}_${index}`}
          title={filter.label}
          options={filter.options}
          selectedValue={selected[filter.label]}
          type={filter.type}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}

export default Filters
