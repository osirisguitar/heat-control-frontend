import { Box, Card, CardHeader, CardContent } from '@mui/material'
import { DateTime } from 'luxon'

import { useSchedules } from '../../../hooks';
import { ControlSchedule, State } from '../../../common/types';
import { useState } from 'react';

export function Events() {
  const { eventString, relativeString } = useMyCustomHook();

  return (
    <Card variant="outlined">
      <CardHeader title="Events" />
      <CardContent>
        <Box sx={{ fontSize: 24, fontWeight: 'bold' }}>{ eventString }</Box>
        <Box>{ relativeString }</Box>
      </CardContent>
    </Card>
  )
}

const useMyCustomHook = () => {
  const { data, isLoading, isFetching, refetch } = useSchedules();

  if (data && data.length > 0) {
    const first = data.sort((a, b) => (a > b ? -1 : 1))[0]

    const from = DateTime.fromFormat(first.schedule.from, "yyyy-MM-dd HH:mm:ss.SSS")
    const to = DateTime.fromFormat(first.schedule.to, "yyyy-MM-dd HH:mm:ss.SSS")
    const scheduleActive = DateTime.now() >= from && DateTime.now() <= to

    let nextHeaterState = 'on'
    let stateChange = DateTime.now()
    let duration = from.diffNow()
    if (scheduleActive) {
      // schedule state is lowered temperature, so opposite of heater state
      nextHeaterState = first.schedule.state === State.active ? 'on' : 'off'
      stateChange = to
      duration = to.diffNow()
    } else {
      // schedule state is lowered temperature, so opposite of heater state
      nextHeaterState = first.schedule.state === State.active ? 'off' : 'on'
      stateChange = from
      duration = from.diffNow()
    }

    const stateChangeString = 'at ' + stateChange.toFormat('HH:mm')

    const eventString =`Heating will turn ${nextHeaterState} ${stateChangeString}`
    const relativeString = (`(in ` + (duration.hours > 0 ? duration.minutes > 30 ? ((duration.hours + 1) + ' hours') : (duration.hours + ' hours') : duration.minutes + ' minutes')) + ')'
    return { data, isLoading, isFetching, refetch, eventString, relativeString }
  }

  const eventString = ''
  const relativeString = ''

  return { eventString, relativeString }
}