import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => (
  <Box sx={{ mt: { lg: '212px', xs: '70px' }, ml: { sm: '50px' } }} position="relative" p="20px">
    <Typography 
      color="#FF2625" 
      fontWeight="700" 
      fontSize="28px" 
      mb="10px" 
      textTransform="uppercase" 
      letterSpacing="1px" 
      sx={{ transition: 'color 0.3s ease-in-out', '&:hover': { color: '#d41a1a' } }}
    >
      Fitness Club
    </Typography>
    <Typography 
      fontWeight="800" 
      sx={{ fontSize: { lg: '48px', xs: '42px' }, lineHeight: '1.2', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }} 
      mb="25px" 
      mt="35px"
    >
      Sweat, Smile <br />
      And Repeat
    </Typography>
    <Typography 
      fontSize="24px" 
      fontFamily="Alegreya" 
      lineHeight="40px" 
      mb="30px"
    >
      Discover the most effective exercises tailored just for you
    </Typography>
    <Stack>
      <a 
        href="#exercises" 
        style={{ 
          marginTop: '50px', 
          textDecoration: 'none', 
          width: '220px', 
          textAlign: 'center', 
          background: '#FF2625', 
          padding: '15px', 
          fontSize: '24px', 
          fontWeight: '600', 
          textTransform: 'uppercase', 
          color: 'white', 
          borderRadius: '6px', 
          transition: 'background 0.3s ease-in-out, transform 0.3s ease-in-out', 
          '&:hover': { 
            background: '#e32c2c', 
            transform: 'scale(1.05)' 
          }
        }}
      >
        Explore Exercises
      </a>
    </Stack>
    <Typography 
      fontWeight={700} 
      color="#FF2625" 
      sx={{ 
        opacity: '0.1', 
        display: { lg: 'block', xs: 'none' }, 
        fontSize: '200px', 
        letterSpacing: '5px', 
        transition: 'opacity 0.3s ease-in-out', 
        '&:hover': { opacity: '0.2' } 
      }}
    >
      Exercise
    </Typography>
    <img 
      src={HeroBannerImage} 
      alt="hero-banner" 
      className="hero-banner-img" 
      style={{ 
        transition: 'transform 0.3s ease-in-out', 
        '&:hover': { transform: 'scale(1.03)' } 
      }} 
    />
  </Box>
);

export default HeroBanner;
