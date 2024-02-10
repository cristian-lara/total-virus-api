
/* eslint-disable-next-line */
import { Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

export interface NotFoundProps {}

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '5rem' }}>
      <ErrorOutlineIcon style={{ fontSize: 120, color: 'secondary.main' }} />
      <Typography variant="h4" gutterBottom>
        404
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={goToHome}>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
