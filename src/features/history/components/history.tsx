import { Card, CardHeader, CardContent } from '@mui/material'
import { DateTime } from 'luxon'

import { ControlSchedule, State } from '../../../common/types';

export function History() {
  //const { data, isLoading, isFetching, refetch } = usePriceHistory();

  return (
    <Card variant="outlined">
      <CardHeader title="History"/>
      <CardContent>
      </CardContent>
    </Card>
  )
}