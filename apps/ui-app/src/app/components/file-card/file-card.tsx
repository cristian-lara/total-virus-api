import { Card, CardContent, Grid, Typography } from '@mui/material';
import styles from './file-card.module.scss';

/* eslint-disable-next-line */
interface BundleInfo {
  highest_datetime: string;
  lowest_datetime: string;
  num_children: number;
  extensions: {
    [key: string]: number;
  };
  file_types: {
    [key: string]: number;
  };
  type: string;
  uncompressed_size: number;
}

interface FileAttributes {
  bundle_info: BundleInfo;
  type_extension: string;
  magic: string;
}

interface FileCardProps {
  attributes: FileAttributes;
}

const FileCard: React.FC<FileCardProps> = ({ attributes }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          File Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">Type Extension: {attributes.type_extension}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Magic: {attributes.magic}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Bundle Info:</Typography>
            <Typography variant="body2">- Highest Datetime: {attributes.bundle_info?.highest_datetime || "Not Available"}</Typography>
            <Typography variant="body2">- Lowest Datetime: {attributes.bundle_info?.lowest_datetime || "Not Available"}</Typography>
            <Typography variant="body2">- Number of Children: {attributes.bundle_info?.num_children !== undefined ? attributes.bundle_info.num_children : "Not Available"}</Typography>
            <Typography variant="body2">
              - File Types: {
              attributes.bundle_info?.file_types
                ? Object.entries(attributes.bundle_info.file_types).map(([key, value]) => `${key}: ${value}`).join(', ')
                : "Not Available"
            }
            </Typography>
            <Typography variant="body2">- Uncompressed Size: {attributes.bundle_info?.uncompressed_size || "Not Available"}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FileCard;
