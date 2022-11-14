import axios from 'axios'

import { ControlState } from '../../common/types'

export interface SearchResponse {
  query: string
  results: Document[]
}

export const HeatControlService = {
  getControlState: async (): Promise<ControlState> => {
    const { data, status } = await axios.get<ControlState>(
      'http://localhost:8003/heatcontrol',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return data
  },
}