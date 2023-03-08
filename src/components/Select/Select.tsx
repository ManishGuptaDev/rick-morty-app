import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './Select.scss'

interface Props {
  selectedValue: string,
  items: {
    label: string,
    value: string
  }[],
  onSelect: (value: string) => void
}


const CustomSelect: React.FC<Props> = ({selectedValue, items, onSelect}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelect(event.target.value);
  };
  
  return (
    <FormControl sx={{ width: '100%' }}>
        <Select
          value={selectedValue}
          onChange={handleChange}
          label=""
          displayEmpty
        >
          {
            items.map(item => (
              <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
  )
}

export default CustomSelect
