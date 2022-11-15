import { Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { useSchedules } from '../../../hooks';

export function Schedule() {
  const { data, isLoading, isFetching, refetch } = useSchedules();
  //  const { mutate: createPet } = useCreatePet();

  return (
    <Card>
      <CardHeader title="Schedule"/>
      <CardContent>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!isLoading && data && data.map((schedule) => (
            <TableRow
              key={schedule.schedule.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {schedule.schedule.id}
              </TableCell>
              <TableCell>
                {schedule.schedule.from}
              </TableCell>
              <TableCell>
                {schedule.schedule.to}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  )
}