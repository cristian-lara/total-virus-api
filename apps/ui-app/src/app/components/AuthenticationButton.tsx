import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
const AuthenticationButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated ? (
    <Button
      startIcon={<LogoutIcon />}
      variant="outlined" color="secondary" sx={{marginTop: '5px'}} onClick={() => logout()}>Logout</Button>
  ) : (
    <Button
      startIcon={<LoginIcon />}
      variant="contained" color="primary" sx={{marginTop: '5px'}} onClick={() => loginWithRedirect()}>Login</Button>
  );
};

export default AuthenticationButton;
