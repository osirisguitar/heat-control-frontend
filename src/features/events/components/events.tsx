import { Card, CardHeader, CardContent } from '@mui/material'
import { DateTime } from 'luxon'

import { useSchedules } from '../../../hooks';
import { ControlSchedule, State } from '../../../common/types';

export function Events() {
  const { data, isLoading, isFetching, refetch } = useSchedules();
  const createEventString = (data: ControlSchedule[]) => {
    if (data && data.length > 0) {
      const first = data.sort((a, b) => (a > b ? -1 : 1))[0]

      const from = DateTime.fromFormat(first.schedule.from, "yyyy-MM-dd HH:mm:ss.SSS")
      const to = DateTime.fromFormat(first.schedule.to, "yyyy-MM-dd HH:mm:ss.SSS")
      const scheduleActive = DateTime.now() >= from && DateTime.now() <= to

      let nextHeaterState = 'on'
      let stateChange = DateTime.now()
      if (scheduleActive) {
        // schedule state is lowered temperature, so opposite of heater state
        nextHeaterState = first.schedule.state === State.active ? 'on' : 'off'
        stateChange = to
      } else {
        // schedule state is lowered temperature, so opposite of heater state
        nextHeaterState = first.schedule.state === State.active ? 'off' : 'on'
        stateChange = from
      }

      const stateChangeString = stateChange.toRelative({ unit: 'hours' }) + ' at ' + stateChange.toFormat('HH:mm')

      const eventString = `Heating will turn ${nextHeaterState} ${stateChangeString}`
      return eventString
    }

    return ''
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Events"/>
      <CardContent>
        { !isLoading && createEventString(data) }
      </CardContent>
    </Card>
  )
}