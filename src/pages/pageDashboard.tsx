import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';

import { HeatControl } from '../features/heatControl'
import { Schedule } from '../features/schedule'
import { Events } from '../features/events'

export const PageDashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={2}>
        <HeatControl />
      </Grid>
      <Grid item xs={12} md={4}>
        <Events />
      </Grid>
      <Grid item xs={12} md={10}>
        <Schedule />
      </Grid>
    </Grid>
  );
};
