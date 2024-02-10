import { Box, Paper, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AuthenticationButton from '../components/AuthenticationButton';

/* eslint-disable-next-line */
const Home: React.FC = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <SecurityIcon style={{ fontSize: 60, marginBottom: 20 }} />

      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Our Security Analyzer
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Our application performs security analysis on IPs, files, and URLs to check for malicious content.
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 20 }}>
        To test the services, please log in.
      </Typography>
      <AuthenticationButton />
    </Paper>
  );
};

export default Home;
