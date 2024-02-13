import { Box, Button, Collapse, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { saveReportVirus, useGetFileReport, useGetFileReportDetails, useUploadFile } from '../../query/url.query';
import { useMutation, useQueryClient } from 'react-query';
import SaveIcon from '@mui/icons-material/Save';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IReportVirusData } from '../../constants';
import { useUser } from '../UserContext';
import { FileAnalysisDetailsResponse } from '../../../types';
import LastAnalysisStatsCard from '../last-analisys-stats-card/last-analisys-stats-card';
import { LastAnalisysIp } from '../last-analisys-ip/last-analisys-ip';
import FileCard from '../file-card/file-card';


/* eslint-disable-next-line */
export default function FileSearchSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState("Waiting for file upload...");

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

  const queryClient = useQueryClient();

  const saveReportMutation = useMutation(saveReportVirus, {
    onSuccess: () => {
      queryClient.invalidateQueries('reportQueryKey');
      setSelectedFile(null);
      setFileId('');
      setSha256('');
      setIsEnabledSave(false);
    },
    onError: (error) => {
      console.error('Error saving the report:', error);
    }
  });
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      uploadFileMutation.mutate(formData);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  useEffect(() => {
    if (selectedFile === null) {
      setStatusMessage('Waiting for file upload...');
    } else if (selectedFile) {
      setStatusMessage("File was uploaded...");
    }

    if (uploadFileMutation.data && selectedFile) {
      setStatusMessage("File is being analyzed...");
    }

    if (fileReportQuery.isSuccess) {
      setStatusMessage("Performing analysis...");
    }

    if (fileReportDetailsQuery.data && fileReportDetailsQuery.data?.data.attributes.last_analysis_results) {
      setStatusMessage("Analysis completed.");
    }
  }, [selectedFile, uploadFileMutation.data, fileReportQuery.isSuccess, fileReportDetailsQuery.data]);

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
       <Grid item xs={12} sm={12}>
         <Typography>Upload a file to analyze</Typography>
       </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <input
            accept="*/*" // Ajusta esto según los tipos de archivo que desees aceptar
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={(event)=> {
              if (event.target.files) {
                setSelectedFile(event.target.files[0]);
              }
            }}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload File
            </Button>
          </label>
          {selectedFile && (
            <p style={{ textAlign: 'center' }}>{selectedFile.name}</p>
          )}
        </Grid>
        <Grid item xs={3} sm={4}>
          <Button
            variant="contained"
            color={'success'}
            onClick={handleUpload}
            disabled={!selectedFile}
            startIcon={<WifiTetheringIcon />}
          >
            Scan File
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
