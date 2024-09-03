import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => (
  <Link 
    className="exercise-card" 
    to={`/exercise/${exercise.id}`} 
    sx={{
      display: 'block',
      textDecoration: 'none',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', 
      borderRadius: '8px', 
      overflow: 'visible', 
      transition: 'box-shadow 0.3s ease-in-out', 
      '&:hover': {
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)' 
      }
    }}
  >
    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
    <Stack direction="row" justifyContent='center'>
      <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'}}>
        {exercise.bodyPart}
      </Button>
      <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {exercise.target}
      </Button>
    </Stack>
    <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '22px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize" display='flex' justifyContent='center'>
      {exercise.name}
    </Typography>
  </Link>
);

export default ExerciseCard;
