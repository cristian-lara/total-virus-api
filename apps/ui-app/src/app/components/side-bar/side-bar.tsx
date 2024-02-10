import React, { useState } from 'react';
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReportIcon from '@mui/icons-material/Assessment';
import AnalysisIcon from '@mui/icons-material/Science';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from '../AuthenticationButton';
/* eslint-disable-next-line */
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, isAuthenticated}= useAuth0()

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar src={user?.picture} alt={user?.name} ><AccountCircleIcon /></Avatar>
          <AuthenticationButton />
        </div>
        <Divider />
        {isAuthenticated ? (
          <List>
            <ListItem button component={Link} to="/perform-report" onClick={()=> setIsOpen(false)}>
              <ListItemIcon><ReportIcon /></ListItemIcon>
              <ListItemText primary="Perform Report" />
            </ListItem>

            <ListItem button component={Link} to="/consult-analisys" onClick={()=> setIsOpen(false)}>
              <ListItemIcon><AnalysisIcon /></ListItemIcon>
              <ListItemText primary="Consult Analysis" />
            </ListItem>
          </List>
        ) : (
          <Typography variant="caption" color="textSecondary" style={{ padding: 16 }}>
            You are not logged in
          </Typography>
        )}
      </Drawer>
    </div>
  );
};

export default Sidebar;
