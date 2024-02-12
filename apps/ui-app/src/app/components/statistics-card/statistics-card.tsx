import { Card, CardContent, Grid, Typography } from '@mui/material';
import styles from './statistics-card.module.scss';
import React from 'react';

/* eslint-disable-next-line */
// Definiendo una interfaz para las estadísticas
export interface Stats {
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
  timeout: number;
}

// Definiendo una interfaz para las props del componente
interface StatisticsCardProps {
  stats: Stats;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ stats }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 'auto', mt: 2, mb: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Scan Results
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(stats).map(([key, value]) => (
            <Grid item xs={6} sm={4} key={key}>
              <Typography variant="h5" component="div">
                {value}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
