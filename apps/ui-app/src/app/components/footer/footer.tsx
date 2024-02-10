import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';

/* eslint-disable-next-line */
export interface FooterProps {}

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
         Developed by CRISTIAN LARA
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'© POWERED by '}
          <Link  color="inherit" href="https://mui.com/" target="_blank" rel="noopener noreferrer">
            Material UI
          </Link> & <Link color="inherit" href="https://es.vitejs.dev/guide/" target="_blank" rel="noopener noreferrer">
          VITE
        </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
