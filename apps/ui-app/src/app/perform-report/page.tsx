import { Box, Container, Grid, Paper, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import TabPanel from '../components/tab-panel/tab-panel';
import React, { useState } from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SearchSection from '../components/search-section/search-section';


/* eslint-disable-next-line */
export interface PerformReportProps {}

export default function PerformReport(props: PerformReportProps) {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyle = {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: '24px',
  };

  const contentStyle = {
    border: `1px solid ${theme.palette.divider}`,
    minHeight: '200px',
    padding: isMobile ? '16px' : '24px',
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ maxWidth: '100%', margin: 'auto', mt: 4, p: isMobile ? 1 : 2, borderLeft: '6px solid #0073ff',
        borderBottom: '6px solid #0073ff', }}>
        <Box sx={{
          position: 'relative',
          paddingRight: '40px',
          marginBottom: '20px'
        }}>
          <Grid container spacing={2} sx={{ alignItems: 'center', marginLeft: isMobile ? 1 : '20px' }}>
            <Grid item xs={12} sm={9}>
              <Typography variant="h5" component="h2" gutterBottom>
                Perform Report
              </Typography>
              <Typography variant="subtitle1">
                This section allows you to perform detailed security reports.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
              <AssessmentIcon sx={{
                fontSize: '4.5rem',
                color: 'action.active',
                verticalAlign: 'bottom', // Alinea el ícono con el texto
              }} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Box sx={{ width: '100%', padding: isMobile ? 1 : '24px', mt: 5, bgcolor: 'background.paper' }}>
        <Box sx={tabStyle}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
            <Tab label="URL" />
            <Tab label="Search" />
            <Tab label="File" />
          </Tabs>
        </Box>

        <Box sx={contentStyle}>
          <TabPanel value={value} index={0}>
            <SearchSection/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Content for Search tab
          </TabPanel>
          <TabPanel value={value} index={2}>
            Content for File tab
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
}
