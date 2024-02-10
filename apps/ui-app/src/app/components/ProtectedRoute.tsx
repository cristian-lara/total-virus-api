import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { CircularProgress, Typography } from '@mui/material';
import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticationButton from './AuthenticationButton';


const ProtectedRoute = ({ component: Component }: {  component: ComponentType<any>;
}) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return     (
      <>
        <Typography variant="caption" color="textSecondary" style={{ padding: 16, marginBottom: 16 }}>
          You are not logged in
        </Typography>
        <AuthenticationButton />
      </>
    )
  }

  const ComponentToRender = withAuthenticationRequired(Component, {
    onRedirecting: () => <CircularProgress />,
  });

  return isAuthenticated ? <ComponentToRender /> : <Navigate to="/home" />;
};

export default ProtectedRoute
