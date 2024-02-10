import { Box, Button, Collapse, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


/* eslint-disable-next-line */
export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // TODO search logic
    console.log('Searching for:', searchTerm);
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9} sm={10}>
          <TextField
            fullWidth
            label="Enter a URL"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <Button disabled={!searchTerm} variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
            Scan URL
          </Button>
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6">RESULTS:</Typography>
        <Box my={2}>
          <Typography variant="body1">Detail Search</Typography>
          <Typography variant="body2">URL: searcher</Typography>
          <Typography variant="body2">Status</Typography>
        </Box>
        <Button
          startIcon={<ExpandMoreIcon />}
          onClick={toggleDetails}
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
        >
          See Detail Report
        </Button>
        <Collapse in={detailsOpen}>
          <Box p={2} mt={2} border={1} borderColor="grey.300">
            {/* Aquí iría el contenido detallado del reporte */}
            <Typography>Detail section collapsable</Typography>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
