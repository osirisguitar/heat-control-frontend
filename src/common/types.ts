interface Control {
  name: string,
  pin?: number
}

enum State {
  inactive = 0,
  active = 1,
}

interface ControlState {
  control: Control,
  state: State
}

interface Schedule {
  id?: number,
  from: string,
  to: string,
  state: State
}

interface ControlSchedule {
  controlName: string,
  schedule: Schedule,
}

export type {
  Control,
  ControlState,
  Schedule,
  ControlSchedule,
}

export {
  State,
}