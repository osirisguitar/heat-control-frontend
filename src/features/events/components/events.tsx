import { Box, Card, CardHeader, CardContent } from '@mui/material'
import { DateTime, Duration } from 'luxon'

import { useSchedules } from '../../../hooks';
import { State } from '../../../common/types';

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
    let stateChange : DateTime
    let duration : Duration
    if (scheduleActive) {
      // schedule state is lowered temperature, so opposite of heater state
      nextHeaterState = first.schedule.state === State.active ? 'on' : 'off'
      stateChange = to
      duration = to.diff(DateTime.now())
    } else {
      // schedule state is lowered temperature, so opposite of heater state
      nextHeaterState = first.schedule.state === State.active ? 'off' : 'on'
      stateChange = from
      duration = from.diff(DateTime.now())
    }

    let stateChangeString = 'at ' + stateChange.toFormat('HH:mm')

    if (stateChange.toRelativeCalendar({ unit: 'days' }) !== 'today') {
      stateChangeString += ' ' + stateChange.toRelativeCalendar({ unit: 'days' })
    }

    const eventString =`Heating will turn ${nextHeaterState} ${stateChangeString}`

    let relativeString = '(in '

    if (duration.as('hours') > 1) {
      relativeString += Math.round(duration.as('hours')) + ' hours'
    } else {
      relativeString += Math.round(duration.as('minutes')) + ' minutes'
    }

    relativeString += ')'

    return { data, isLoading, isFetching, refetch, eventString, relativeString }
  }

  const eventString = ''
  const relativeString = ''

  return { eventString, relativeString }
}