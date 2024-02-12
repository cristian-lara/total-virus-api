import { useState } from 'react';
import styles from './last-analisys-ip.module.scss';
import { Box, Card, CardContent, Pagination, Typography } from '@mui/material';

/* eslint-disable-next-line */
interface LastAnalysisResult {
  method: string;
  engine_name: string;
  category: string;
  result: string;
}

export const LastAnalisysIp =  ({ last_analysis_results }:{
  last_analysis_results: { [engine: string]: LastAnalysisResult };
}) => {
  const [page, setPage] = useState(1);
  const resultsPerPage = 9;
  const resultsKeys = Object.keys(last_analysis_results);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedResultsKeys = resultsKeys.slice((page - 1) * resultsPerPage, page * resultsPerPage);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {paginatedResultsKeys.map((key) => (
          <Card key={key} sx={{ minWidth: 275, maxWidth: 300, marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {last_analysis_results[key].engine_name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Method: {last_analysis_results[key].method}
              </Typography>
              <Typography variant="body2">
                Category: {last_analysis_results[key].category}
              </Typography>
              <Typography variant="body2">
                Result: {last_analysis_results[key].result}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Pagination
        count={Math.ceil(resultsKeys.length / resultsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
    </Box>
  );
};
