import { RowingSharp } from '@mui/icons-material';
import { Card, CardContent, CardHeader, getTableRowUtilityClass } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { useSchedules } from '../../../hooks';

export function Schedule() {
  const { data, isLoading, isFetching, refetch } = useSchedules();
  //  const { mutate: createPet } = useCreatePet();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'from', headerName: 'Start', width: 130 },
    { field: 'to', headerName: 'End', width: 130 },
  ]

  const getRows = (schedules) => {
    console.log(isLoading, schedules)
    if (isLoading || !schedules) {
      return []
    }

    const rows = schedules.map((schedule) => {
      return {
        id: schedule.rowid,
        from: schedule.from_date,
        to: schedule.to_date,
      }
    })

    return rows
  }

  return (
    <Card>
      <CardHeader title="Schedule"/>
      <CardContent>
        <DataGrid sx={{ height: 500 }}
          rows={getRows(data)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          />        
      </CardContent>
    </Card>
  )
}