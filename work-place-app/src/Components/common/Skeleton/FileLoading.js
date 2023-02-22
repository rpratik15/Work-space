import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

export default function FileLoading({fields}) {
  return (
    <Grid className="grid-container" container spacing={4} >
      {[...Array(fields)].map((_, i) => (
        <Grid item xs={12} sm={6}>
        <Skeleton key={i} variant="rounded" width={'100%'} height={60} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Skeleton variant="rounded" width={'100%'} height={120} />
        </Grid>
     </Grid>
  );
}