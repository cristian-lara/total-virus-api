import { Box, Button, Collapse, FormHelperText, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { saveReportVirus, useGetIpReport, useScanUrl } from '../../query/url.query';
import { useMutation, useQueryClient } from 'react-query';
import SaveIcon from '@mui/icons-material/Save';
import { useUser } from '../UserContext';
import WhoisInfo from '../who-is-info/who-is-info';
import { LastAnalisysIp } from '../last-analisys-ip/last-analisys-ip';
import LastAnalisysStatsCard from '../last-analisys-stats-card/last-analisys-stats-card';
import { ReportData } from '../card-analisys-details/card-analisys-details';
import { IReportVirusData } from '../../constants';


/* eslint-disable-next-line */
export default function IpSearchSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [messageRequest, setMessageRequest] = useState('');
  const [isQueryEnabled, setIsQueryEnabled] = useState(false); // Nuevo estado para controlar la activación de la consulta
  const [error, setError] = useState('');

  const { data: ipReport, isLoading: isReportLoading } = useGetIpReport(searchTerm, isQueryEnabled);

  const isValidIp = (ip: string) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };
  const { user } = useUser();
  const scanMutation = useScanUrl();
  const queryClient = useQueryClient();

  const saveReportMutation = useMutation(saveReportVirus, {
    onSuccess: () => {
      queryClient.invalidateQueries('reportQueryKey');
      setSearchTerm('');

    },
    onError: (error) => {
      console.error('Error saving the report:', error);
    }
  });

  const handleSaveReport = (reportDetails: ReportData) => {
    const dataReport: IReportVirusData = {
      reportDetail: reportDetails,
      type: 'WEB',
      user: user?.id as string,
      urlSearch: searchTerm
    };
    saveReportMutation.mutate(dataReport);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (isValidIp(value) || value === '') {
      setError('');
    } else {
      setError('Please enter a valid IP address');
    }
  };
  const handleSearch = () => {
    if (!searchTerm) {
      setMessageRequest('Please enter a valid IP address.');
      return;
    }
    setMessageRequest('Completed');
    setIsQueryEnabled(true);
  };
  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center">
        <Typography>Add an ipAddress and see if it is a safe IP</Typography>
        <Grid item xs={9} sm={10}>
          <TextField
            fullWidth
            label="Enter a IP address"
            variant="outlined"
            value={searchTerm}
            placeholder={'192.198.1.1'}
            onChange={handleSearchChange}
            error={!!error}
          />
          {error && (
            <FormHelperText error={true}>{error}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={3} sm={2}>
          <Button  disabled={!searchTerm || !!error} variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
            Scan IP
          </Button>
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6">RESULTS:</Typography>
        <Box my={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">IP: {searchTerm}</Typography>
              <Typography variant="body2">Status: {messageRequest}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                disabled={!ipReport}
                startIcon={<SaveIcon />}
                onClick={() => handleSaveReport(ipReport)}
              >
                Save Report
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Button
          startIcon={<ExpandMoreIcon />}
          onClick={toggleDetails}
          fullWidth
          color={'info'}
          variant="contained"
          sx={{ my: 2 }}
          disabled={scanMutation.isLoading}
        >
          See Detail Report
        </Button>
        <Collapse in={detailsOpen}>
          <Box p={2} mt={2} border={1} borderColor="grey.300">
            {isQueryEnabled && ipReport && !isReportLoading && (
             <>
               <LastAnalisysStatsCard last_analysis_stats={ipReport.attributes.last_analysis_stats}
                                      country={ipReport.attributes.country}
                                      reputation={ipReport.attributes.reputation}/>
             <WhoisInfo whois={ipReport.attributes.whois}/>
               <Typography variant={'h4'} sx={{marginTop: 4, marginBottom: 3}}>
                 Last Analysis
               </Typography>
              <LastAnalisysIp last_analysis_results={ipReport.attributes.last_analysis_results} />
             </>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
