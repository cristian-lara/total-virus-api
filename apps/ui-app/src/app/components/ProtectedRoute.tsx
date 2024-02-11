import { useAuth0, User, withAuthenticationRequired } from '@auth0/auth0-react';
import { CircularProgress, Typography } from '@mui/material';
import React, { ComponentType, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticationButton from './AuthenticationButton';
import { useQueryClient } from 'react-query';
import { findOrCreateUser } from '../query/url.query';


const ProtectedRoute = ({ component: Component }: {  component: ComponentType<any>;
}) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const queryClient = useQueryClient();

  const getUserData = async () => {
    try {
      const { sub, email } = user as User;
      queryClient.setQueryData('userData', await findOrCreateUser(sub as string, email as string));
    } catch (error) {
      console.error('Save user failed')
    }
  };
  useEffect(() => {


    if (isAuthenticated && user) {
      console.log('user f', user)
      getUserData();
    }
  }, [isAuthenticated, user, queryClient,]);

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
