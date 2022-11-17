import { Button, Card, CardActions, CardHeader, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { DateTime } from 'luxon'
import { Delete } from '@mui/icons-material'

import { useSchedules } from '../../../hooks'

export function Schedule() {
  const { data, isLoading, isFetching, refetch } = useSchedules();  
  //  const { mutate: createPet } = useCreatePet();

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
        <Button>Add Schedule</Button>
      </CardActions>
    </Card>
  )
}