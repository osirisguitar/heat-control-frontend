import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';

export const PageDashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card variant="outlined">
          <CardHeader title="Heater Status" />
          <CardContent>
            <Box>Bla bla bla</Box>
            <Button variant="contained">Press</Button>
          </CardContent>
        </Card>
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
