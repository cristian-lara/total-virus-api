import { Box, Button, Collapse, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { saveReportVirus, useGetUrlReport, useScanUrl } from '../../query/url.query';
import { useMutation, useQueryClient } from 'react-query';
import CardAnalysisDetails, { ReportData } from '../card-analisys-details/card-analisys-details';
import SaveIcon from '@mui/icons-material/Save';
import { IReportVirusData } from '../../constants';
import { useUser } from '../UserContext';
import StatisticsCard from '../statistics-card/statistics-card';


/* eslint-disable-next-line */
export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [idAnalysis, setIdAnalysis] = useState('');
  const [messageRequest, setMessageRequest] = useState('');

  const { user } = useUser();
  const scanMutation = useScanUrl();
  const queryClient = useQueryClient();

  const reportQuery = useGetUrlReport(idAnalysis, !!idAnalysis);

  const saveReportMutation = useMutation(saveReportVirus, {
    onSuccess: () => {
      queryClient.invalidateQueries('reportQueryKey');
      setSearchTerm('');

    },
    onError: (error) => {
      console.error('Error saving the report:', error);
    }
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchTerm(value);
    const valid = isValidUrl(value);
    setIsUrlValid(valid);

    if (value && !valid) {
      setError('Please enter a valid URL.');
    } else {
      setError('');
    }
  };

  const isValidUrl = (urlString: string): boolean => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // nombre de dominio
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // puerto y path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(urlString);
  };

  const handleSearch = () => {
    setMessageRequest('Scanning...');
    scanMutation.mutate({ url: searchTerm }, {
      onSuccess: (data) => {
        setIdAnalysis(data.data.id);
        setMessageRequest('Scan Completed');
      },
      onError: (error) => {
        console.error(error);
        setMessageRequest('Analysis was not completed, please enter a valid URL');
      }
    });
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const handleSaveReport = (reportDetails: ReportData) => {
    const dataReport: IReportVirusData = {
      reportDetail: reportDetails,
      type: 'URL',
      user: user?.id as string,
      urlSearch: searchTerm
    };
    saveReportMutation.mutate(dataReport);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center">
        <Typography>Add an link and see if it is a safe URL</Typography>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Enter a URL"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            error={!!error}
            helperText={error}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <Button  disabled={!searchTerm || !isUrlValid} variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
            Scan URL
          </Button>
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6">RESULTS:</Typography>
        <Box my={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">URL: {searchTerm}</Typography>
              <Typography variant="body2">Status: {messageRequest}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                disabled={(!reportQuery.data || (!reportQuery.data.data && !reportQuery.data.data.attributes)) || searchTerm === '' }
                startIcon={<SaveIcon />}
                onClick={() => handleSaveReport(reportQuery.data.data.attributes)}
              >
                Save Report
              </Button>
            </Grid>
          </Grid>
        </Box>
        {reportQuery.data && reportQuery.data.data && reportQuery.data.data.attributes ? (
          <StatisticsCard stats={reportQuery.data.data.attributes.stats} />
        ) : (
          <Typography>No stats available</Typography>
        )}


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
            {reportQuery.isLoading ? (
              <Typography>Loading report...</Typography>
            ) : reportQuery.isError ? (
              <Typography>Error: Was not possible load the details</Typography>
            ) : (
              reportQuery.data && reportQuery.data.data && reportQuery.data.data.attributes ? (
                <CardAnalysisDetails reportData={reportQuery.data.data.attributes} />
              ) : (
                <Typography>No data available</Typography>
              )
            )}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
