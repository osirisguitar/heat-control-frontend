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

export {
  Control,
  State,
  ControlState,
}