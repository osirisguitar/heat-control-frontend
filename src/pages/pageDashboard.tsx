import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';

import { HeatControl } from '../features/heatControl/components/heatControl'


export const PageDashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} md={2}>
        <HeatControl />
      </Grid>
      <Grid item xs={8}>
        <Card variant="outlined">
          <CardHeader title="Schedule" />
          <CardContent>
            <Box>Bla bla bla</Box>
            <Button variant="contained">Press</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
