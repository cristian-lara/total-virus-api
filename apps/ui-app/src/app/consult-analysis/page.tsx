import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
  TableHead,
  TableRow,
  IconButton,
  Collapse, Box
} from '@mui/material';
import React, { useState } from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';

/* eslint-disable-next-line */
type DataRow = {
  id: number;
  type: 'URL' | 'FILE' | 'WEB';
  createdAt: string;
};

const Row: React.FC<{ row: DataRow }> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.type}
        </TableCell>
        <TableCell>{row.createdAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Details
              </Typography>
              {/* Here you can place additional row details */}
              <Typography>Info adicional</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default function ConsultAnalysis() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Example rows data
  const rows: DataRow[] = [
    { id: 1, type: 'URL', createdAt: '2022-07-21' },
    { id: 2, type: 'WEB', createdAt: '2022-07-21' },
    { id: 3, type: 'URL', createdAt: '2022-07-21' },
    { id: 4, type: 'FILE', createdAt: '2022-07-21' },
    { id: 5, type: 'URL', createdAt: '2022-07-21' },
    // ... more rows
  ];

  // Handle pagination change
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ alignItems: 'center', marginLeft: isMobile ? 1 : '20px' }}>
        <Grid item xs={12} sm={9}>
          <Typography variant="h5" component="h2" gutterBottom>
            Consult Analysis
          </Typography>
          <Typography variant="subtitle1">
            This section allows you to see all reports.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
          <AssessmentIcon sx={{
            fontSize: '4.5rem',
            color: 'action.active'  ,
            verticalAlign: 'bottom',
          }} />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table size={isMobile ? 'small' : 'medium'} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};
