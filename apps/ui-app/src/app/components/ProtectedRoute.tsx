import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { CircularProgress } from '@mui/material';
import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ component: Component }: {  component: ComponentType<any>;
}) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  const ComponentToRender = withAuthenticationRequired(Component, {
    onRedirecting: () => <CircularProgress />,
  });

  return isAuthenticated ? <ComponentToRender /> : <Navigate to="/home" />;
};

export default ProtectedRoute
