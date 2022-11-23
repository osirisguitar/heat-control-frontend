import { Button, Card, CardActions, CardHeader, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { DateTime } from 'luxon'
import { Delete } from '@mui/icons-material'
import { useState } from 'react'

import { EditSchedule } from '../'

import { useSchedules } from '../../../hooks'
import { ControlSchedule } from '../../../common/types'

export function Schedule() {
  const { data, isLoading, isFetching, refetch } = useSchedules();  

  const [open, setOpen] = useState<boolean>(false)
  const [currentSchedule, setCurrentSchedule] = useState<ControlSchedule | null>(null)

  const formatDate = (dateString: string) : string => {
    const date = DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss.SSS')
    
    return date.toRelativeCalendar() + ' ' + date.toFormat('HH:mm')
  }

  const getStyleByDates = (fromDateString: string, toDateString: string) : string => {
    const from = DateTime.fromFormat(fromDateString, 'yyyy-MM-dd HH:mm:ss.SSS')
    const to = DateTime.fromFormat(toDateString, 'yyyy-MM-dd HH:mm:ss.SSS')
    const now = DateTime.now()

    return now >= from && now <= to ? 'darkred' : ''
  }

  const openSchedule = (schedule : ControlSchedule | null) => {
    console.log('openSchedule', schedule)
    setCurrentSchedule(schedule)
    setOpen(true)
  }

  const closeSchedule = () => {
    setOpen(false)
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Schedule (Heating Off)" />
      <CardContent>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!isLoading && data && data.map((schedule) => (
            <TableRow
              key={schedule.schedule.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: getStyleByDates(schedule.schedule.from, schedule.schedule.to) }}
              onClick={() => openSchedule(schedule)}
            >
              <TableCell>
                {formatDate(schedule.schedule.from)}
              </TableCell>
              <TableCell>
                {formatDate(schedule.schedule.to)}
              </TableCell>
              <TableCell>
                <IconButton><Delete/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
      <CardActions>
        <EditSchedule open={open} scheduleId={currentSchedule?.schedule.id} closeDialog={closeSchedule} />
        <Button onClick={() => { setCurrentSchedule(null); setOpen(true) }}>Add Manual Schedule</Button>
        <Button onClick={() => { setCurrentSchedule(null); setOpen(true) }}>Add Automatic Schedule</Button>
      </CardActions>
    </Card>
  )
}