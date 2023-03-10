import React from 'react'
import { Select } from 'components/Select'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FiltersTypes } from 'types'
import './FilterCard.scss'

interface Props {
  title: string
  options: { label: string; value: string; disabled?: boolean }[]
  type: FiltersTypes
  selectedValue: string
  onChange: (title: string, value: string) => void
}

const FilterCard: React.FC<Props> = ({ title, options, type, selectedValue, onChange }) => {
  const onSelect = (value: string) => {
    onChange(title, value)
  }

  return (
    <div className='filter-card'>
      <div className='filter-card__title'>{title}</div>
      <div className='filter-card__filter'>
        {
          {
            [FiltersTypes.SELECT]: (
              <Select items={options} onSelect={onSelect} selectedValue={selectedValue} />
            ),
            [FiltersTypes.AUTOCOMPLETE]: (
              <Autocomplete
                className='autocomplete__wrapper'
                disablePortal
                id='combo-box-demo'
                blurOnSelect
                disableClearable
                value={options.find(({value}) => value === selectedValue)}
                options={options}
                renderInput={(params) => <TextField {...params} />}
                onChange={(event, selectedOption) => onSelect(selectedOption?.value || '')}
              />
            ),
          }[type]
        }
      </div>
    </div>
  )
}
export default FilterCard
