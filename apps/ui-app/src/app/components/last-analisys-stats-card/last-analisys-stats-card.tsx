import { Card, CardContent, Grid, Typography } from '@mui/material';
import styles from './last-analisys-stats-card.module.scss';

/* eslint-disable-next-line */
export interface LastAnalisysStatsCardProps {}

interface LastAnalysisStatsProps {
  last_analysis_stats: {
    malicious: number;
    suspicious: number;
    undetected: number;
    harmless: number;
    timeout: number;
    "confirmed-timeout"?: number;
    failure: number;
    "type-unsupported"?: number;
  };
  country?: string;
  reputation?: number;
}

const LastAnalysisStatsCard = ({ last_analysis_stats, country, reputation }: LastAnalysisStatsProps) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 4}}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Last Analysis Stats
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {Object.entries(last_analysis_stats).map(([statName, statValue]) => (
            <Grid item xs={6} sm={4} key={statName}>
              <Typography variant="body2" color="text.secondary">
                {statName.charAt(0).toUpperCase() + statName.slice(1)}
              </Typography>
              <Typography variant="body1">
                {statValue}
              </Typography>
            </Grid>
          ))}
          {country && reputation && (
           <>
             <Grid item xs={4}>
               <Typography variant="body2" color="text.secondary">
                 Country
               </Typography>
               <Typography variant="body1">
                 {country}
               </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography variant="body2" color="text.secondary">
                 Reputation
               </Typography>
               <Typography variant="body1">
                 {reputation}
               </Typography>
             </Grid>
           </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LastAnalysisStatsCard;
