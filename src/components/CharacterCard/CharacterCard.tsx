import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Character as CharacterType } from 'graphql/__generated__/api.types'
import './CharacterCard.scss'

interface Props {
  character: CharacterType
}

const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <div className='character-card'>
      <Card>
        <CardHeader title={character.name} subheader={character.species} />
        <CardMedia
          component='img'
          height='250'
          image={character.image || ''}
          alt={`${character.name} image`}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {`Status: ${character.status}`}
            <br />
            {`type: ${character.type}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default CharacterCard
