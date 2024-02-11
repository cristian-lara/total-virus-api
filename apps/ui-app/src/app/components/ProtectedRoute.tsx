import { useAuth0, User, withAuthenticationRequired } from '@auth0/auth0-react';
import { CircularProgress, Typography } from '@mui/material';
import React, { ComponentType, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticationButton from './AuthenticationButton';
import { useQueryClient } from 'react-query';
import { findOrCreateUser } from '../query/url.query';
import { useUser } from './UserContext';


const ProtectedRoute = ({ component: Component }: {  component: ComponentType<any>;
}) => {
  const { isAuthenticated, isLoading, user: auth0User } = useAuth0();
  const queryClient = useQueryClient();
  const { setUser } = useUser();


  const getUserData = async () => {
    try {
      if(auth0User){
        const userData = await findOrCreateUser(auth0User.sub as string, auth0User.email as string);
        setUser(userData);
      }
    } catch (error) {
      console.error('Save user failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      getUserData();
    }
  }, [isAuthenticated, auth0User, setUser, queryClient]);

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
