import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Box mt="80px" bgcolor="#FFF3F4" py="20px">
    <Stack
      gap="20px"
      sx={{ alignItems: 'center' }}
      flexWrap="wrap"
      px="40px"
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        color="#FF2625"
        textAlign="center"
      >
        GYM
      </Typography>
      <Typography variant="body2" color="#3A1212" textAlign="center">
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </Typography>
    </Stack>
  </Box>
);

export default Footer;
