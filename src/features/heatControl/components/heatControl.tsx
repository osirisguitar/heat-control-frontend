import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

import { ControlState, State } from '../../../common/types'
import { HeatControlService } from '../heatControlService'

export function HeatControl() {
  const[controlState, setControlState] = useState<ControlState>()

  useEffect(() => {
    const timer = setInterval(async () => {
      setControlState(await HeatControlService.getControlState())
    }, 60000);
    
    // clearing interval
    return () => clearInterval(timer);
  });

  return (
    <Card variant="outlined" sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: "column",
    }}>
      <CardHeader title="Heating Status" />
      <CardContent>
        <img
          src={`${controlState?.state === State.inactive ? '/src/assets/green-light.png' : '/src/assets/red-light.png'}`}
          alt={'state'}
          width={100}
          loading="lazy"
        />
      </CardContent>
    </Card>
  )
}
