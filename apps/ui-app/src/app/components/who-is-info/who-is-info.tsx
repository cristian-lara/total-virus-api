import { Box, Typography } from '@mui/material';
import styles from './who-is-info.module.scss';

/* eslint-disable-next-line */
const WhoisInfo= ({ whois }:{
  whois: string;
}) => {
  const whoisObj = whois.split('\n').reduce((acc, current) => {
    const [key, value] = current.split(':').map((str) => str.trim());
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as { [key: string]: string });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Whois Information
      </Typography>
      {Object.entries(whoisObj).map(([key, value], index) => (
        <Typography key={index} variant="body2">
          <strong>{key}:</strong> {value}
        </Typography>
      ))}
    </Box>
  );
};

export default WhoisInfo;
