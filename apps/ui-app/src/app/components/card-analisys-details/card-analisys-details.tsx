
/* eslint-disable-next-line */

import { Box, Card, CardContent, Grid, Pagination, Typography } from "@mui/material";
import { useState } from 'react';

export interface AnalysisResult {
  method: string;
  engine_name: string;
  category: string;
  result: string;
}

export interface ReportData {
  results: { [key: string]: AnalysisResult };
  stats: {
    malicious: number;
    suspicious: number;
    undetected: number;
    harmless: number;
    timeout: number;
  };
  date: number;
  status: string;
}
const ITEMS_PER_PAGE = 9;

const renderAnalysisResults = (results: { [key: string]: AnalysisResult }, startIndex: number, endIndex: number) => {
  return Object.entries(results).slice(startIndex, endIndex).map(([engine, result]) => (
    <Grid item xs={12} sm={6} md={4} key={engine}>
      <Card raised>
        <CardContent>
          <Typography variant="h6">{result.engine_name}</Typography>
          <Typography color="textSecondary">
            Method: {result.method}
          </Typography>
          <Typography color="textSecondary">
            Category: {result.category}
          </Typography>
          <Typography color="textSecondary">
            Result: {result.result}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));
};

const CardAnalysisDetails = ({ reportData }: { reportData?: ReportData }) => {
  const [page, setPage] = useState(1);

  if (!reportData) {
    return <></>;
  }

  if (reportData.status === 'queued') {
    return <>Loading Details</>;
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const resultsOnPage = Object.entries(reportData.results).slice(startIndex, endIndex);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const pageCount = Math.ceil(Object.keys(reportData.results).length / ITEMS_PER_PAGE);

  return (
    <Box>
      <Grid container spacing={2}>
        {renderAnalysisResults(reportData.results, startIndex, endIndex)}
      </Grid>
      {pageCount > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination count={pageCount} page={page} onChange={handleChangePage} />
        </Box>
      )}
    </Box>
  );
};

export default CardAnalysisDetails;
