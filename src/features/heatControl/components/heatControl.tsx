import  { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

import { ControlState, State } from '../../../common/types'
import { useControlState } from '../../../hooks';

export function HeatControl() {
  const { data, isLoading, isFetching, refetch } = useControlState();

  return (
    <Card variant="outlined" sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: "column",
    }}>
      <CardHeader title="Heating Status" />
      <CardContent>
        <img
          src={`${data?.state === State.inactive ? '/src/assets/green-light.png' : '/src/assets/red-light.png'}`}
          alt={'state'}
          width={100}
          loading="lazy"
        />
      </CardContent>
    </Card>
  )
}
