import { Card, CardContent, CardHeader } from '@mui/material'

import { useSchedules } from '../../../hooks';

export function Schedule() {
  const { data, isLoading, isFetching, refetch } = useSchedules();
//  const { mutate: createPet } = useCreatePet();

  return (
    <Card>
      <CardHeader title="Schedule"/>
      <CardContent>
        Hej
      </CardContent>
    </Card>
  )
}