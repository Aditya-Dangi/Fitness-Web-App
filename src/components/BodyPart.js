import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../assets/icons/gym.png';

const BodyPart = ({ item, setBodyPart, bodyPart }) => (
  <Stack
    type="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={{
      border: bodyPart === item ? '4px solid #FF2625' : '4px solid transparent',
      background: bodyPart === item ? 'linear-gradient(145deg, #ffffff, #e0e0e0)' : '#ffffff',
      borderRadius: '20px',
      width: '270px',
      height: '282px',
      cursor: 'pointer',
      gap: '20px',
      boxShadow: bodyPart === item ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      },
    }}
    onClick={() => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
  >
    <img src={Icon} alt="dumbbell" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
    <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize">
      {item}
    </Typography>
  </Stack>
);

export default BodyPart;
