import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ReportIcon from '@mui/icons-material/Assessment';
import AnalysisIcon from '@mui/icons-material/Science';
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
/* eslint-disable-next-line */
const SidebarMenu= () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width:240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width:  240,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
          },
        }}
      >
        <List>
          <ListItem button component="a" href="/perform-report">
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
         <ListItemText primary="Perform Report" />
          </ListItem>
          <ListItem button component="a" href="/consult-analysis">
            <ListItemIcon>
              <AnalysisIcon />
            </ListItemIcon>
         <ListItemText primary="Consult My Analysis" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SidebarMenu;
