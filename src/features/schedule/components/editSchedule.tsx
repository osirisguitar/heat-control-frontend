import { Stack, Button, Dialog, DialogTitle, TextField } from '@mui/material'
import { DateTime } from 'luxon'
import { Delete, SettingsPowerRounded } from '@mui/icons-material'
import { useState } from 'react'

import { useCreateSchedule, useScheduleById } from '../../../hooks'
import { ControlSchedule } from '../../../common/types'

export function EditSchedule({ scheduleId, open, closeDialog }: { scheduleId: Number | undefined, open: boolean, closeDialog: any }) {
  const { mutate: createSchedule } = useCreateSchedule()
  const { data: schedule, isLoading } = useScheduleById({ id: scheduleId })
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const saveSchedule = () => {
    if (schedule?.schedule?.id) {
      createSchedule(schedule)
      closeDialog()
    } else {
      createSchedule({
        controlName: 'lower-temperature',
        schedule: {
          from,
          to,
          state: 1,
        }
      })
      closeDialog()
    }
  }

  const onChangeFrom = (event: any) => {
    console.log(event.target.value)
    setFrom (event.target.value)
  }

  return (
    <Dialog open={open} >
      <DialogTitle>{ schedule?.schedule?.id ? 'Edit' : 'Add' } Schedule<Button onClick={() => closeDialog()}>X</Button></DialogTitle>
      <Stack sx={{ m:2 }}>
        { schedule?.schedule?.id && (<TextField id="from" label="Start" variant="outlined" placeholder={'2022-01-01 00:00.00.000'} sx={{m:1}} value={schedule.schedule?.from} />) }
        { schedule?.schedule?.id && (<TextField id="to" label="End" variant="outlined" placeholder={'2022-01-01 00:00.00.000'} sx={{m:1}} value={schedule.schedule?.to} />) }
        { !schedule?.schedule?.id && (<TextField id="from" label="Start" variant="outlined" placeholder={'2022-01-01 00:00.00.000'} sx={{m:1}} value={from} onChange={(event) => onChangeFrom(event)} />) }
        { !schedule?.schedule?.id && (<TextField id="to" label="End" variant="outlined" placeholder={'2022-01-01 00:00.00.000'} sx={{m:1}} value={to} onChange={(event) => setTo(event.target.value)} />) }
        <Button onClick={() => saveSchedule()}>Save</Button>
      </Stack>
    </Dialog>
  )
}