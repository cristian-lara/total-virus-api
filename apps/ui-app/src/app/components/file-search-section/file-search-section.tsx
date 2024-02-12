import { Box, Button, Collapse, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { saveReportVirus, useGetFileReport, useGetFileReportDetails, useUploadFile } from '../../query/url.query';
import { useMutation, useQueryClient } from 'react-query';
import SaveIcon from '@mui/icons-material/Save';
import { IReportVirusData } from '../../constants';
import { useUser } from '../UserContext';
import { FileAnalysisDetailsResponse } from '../../../types';
import LastAnalysisStatsCard from '../last-analisys-stats-card/last-analisys-stats-card';
import { LastAnalisysIp } from '../last-analisys-ip/last-analisys-ip';
import FileCard from '../file-card/file-card';


/* eslint-disable-next-line */
export default function FileSearchSection() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string>('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sha256, setSha256] = useState('');
  const [isEnabledSave, setIsEnabledSave] = useState(false);
  const { user } = useUser();

  const uploadFileMutation = useUploadFile();

  const fileReportQuery = useGetFileReport(fileId, !!fileId);

  const fileReportDetailsQuery = useGetFileReportDetails(sha256, !!sha256);

  useEffect(() => {
    if (uploadFileMutation.isSuccess && uploadFileMutation.data) {
      setFileId(uploadFileMutation.data.data.id);
    }
  }, [uploadFileMutation.data?.data.id, uploadFileMutation.isSuccess]);

  useEffect(() => {
    const sha256Value = fileReportQuery.data?.meta.file_info.sha256;
    if (fileReportQuery.isSuccess && sha256Value) {
      setSha256(sha256Value);
    }
  }, [fileReportQuery.isSuccess, fileReportQuery.data?.meta.file_info.sha256]);

  useEffect(() => {
    const attributes = fileReportQuery.data?.data.attributes;
    if (fileReportDetailsQuery.isSuccess && attributes) {
      setIsEnabledSave(true)
    }
  }, [fileReportDetailsQuery.isSuccess, fileReportDetailsQuery.data?.data.attributes]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const queryClient = useQueryClient();

  const saveReportMutation = useMutation(saveReportVirus, {
    onSuccess: () => {
      queryClient.invalidateQueries('reportQueryKey');
      setFile(null);
      setFileId('');
      setSha256('');
      setIsEnabledSave(false);
    },
    onError: (error) => {
      console.error('Error saving the report:', error);
    }
  });
  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      uploadFileMutation.mutate(formData);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  let statusMessage = "Waiting for file upload...";
  if (uploadFileMutation.data) {
    statusMessage = "File is being analyzed...";
  }
  if (fileReportQuery.isSuccess) {
    statusMessage = "Performing analysis...";
  }
  if (fileReportDetailsQuery.data && fileReportDetailsQuery.data?.data.attributes.last_analysis_results) {
    statusMessage = "Analysis completed.";
  }
  const handleSaveReport = (reportDetails: FileAnalysisDetailsResponse) => {
    const dataReport: IReportVirusData = {
      reportDetail: reportDetails,
      type: 'FILE',
      user: user?.id as string,
      urlSearch: reportDetails.data.attributes.meaningful_name
    };
    saveReportMutation.mutate(dataReport);
  };
  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center">
        <Typography>Upload a file to analyze</Typography>
        <Grid item xs={9} sm={10}>
          <input
            type="file"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file}
            startIcon={<SaveIcon />}
          >
            Upload File
          </Button>
        </Grid>
      </Grid>
      <Box my={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Upload Status: {statusMessage}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={!isEnabledSave}
              onClick={() => {
                if (fileReportDetailsQuery.data) {
                  handleSaveReport(fileReportDetailsQuery.data);
                }
              }}
            >
              Save Report
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>

        <Button
          startIcon={<ExpandMoreIcon />}
          onClick={toggleDetails}
          fullWidth
          color={'info'}
          variant="contained"
          sx={{ my: 2 }}
          disabled={uploadFileMutation.isLoading}
        >
          See Detail Report
        </Button>
        <Collapse in={detailsOpen}>
          <Box p={2} mt={2} border={1} borderColor="grey.300">

            {fileReportDetailsQuery.data?.data.attributes.last_analysis_stats&&(
           <>
             <FileCard attributes={fileReportDetailsQuery.data?.data.attributes}/>
             <LastAnalysisStatsCard last_analysis_stats={fileReportDetailsQuery.data?.data.attributes.last_analysis_stats}/>
             <Typography variant={'h5'} sx={{marginTop: 4, marginBottom: 4}}> Last Analysis Result</Typography>
             <LastAnalisysIp last_analysis_results={fileReportDetailsQuery.data?.data.attributes.last_analysis_results}/>
           </>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
