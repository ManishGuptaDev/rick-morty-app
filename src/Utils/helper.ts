import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { Maybe } from 'graphql/__generated__/api.types'

export const getUniqueData = (data: { [key: string]: Maybe<unknown> }[], attr: string) => {
  let newVal = data.map((curElem) => {
    return curElem[attr]
  })

  return (newVal = [...Array.from(new Set(newVal))])
}

export const isMobile = () => {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
};