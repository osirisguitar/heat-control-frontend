import React from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { ControlState, ControlSchedule } from './common/types';

const baseUrl = 'http://localhost:8003'

export const useSchedules = () =>
  useQuery<ControlSchedule[], AxiosError>({
    queryKey: ['schedule'], 
    queryFn: () =>
      axios.get<ControlSchedule[]>(baseUrl + '/heatcontrol/schedule').then((res) => {
        const data = res.data.map((schedule: any) => {
          return {
            controlName: schedule.control_name,
            schedule: {
              id: schedule.rowid,
              from: schedule.from_date,
              to: schedule.to_date,
              state: schedule.state,
            }
          }
        })

        return data
      }),
    refetchInterval: 30000
  });

export const useControlState = () =>
  useQuery<ControlState, AxiosError>({
    queryKey: ['controlstate'], 
    queryFn: () =>
      axios.get<ControlState>(baseUrl + '/heatcontrol').then((res) => {
        return res.data
      }),
    refetchInterval: 30000
  });

/*export const useSchedules = () => {
  const [state, setState] = React.useState<DataState<ControlSchedule[]>>(initialState);

  const get = () => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    axios
      .get(baseUrl + '/heatcontrol/schedule')
      .then((res) => {
        const data = res.data.map((schedule: any) => {
          return {
            controlName: schedule.control_name,
            schedule: {
              id: schedule.rowid,
              from: schedule.from_date,
              to: schedule.to_date,
              state: schedule.state,
            }
          }
        })
        setState((current) =>
          Object.assign({}, current, { isLoading: false, data: data })
        )
      })
  }

  React.useEffect(() => {
    get();
  }, []);

  return { ...state, isFetching: state.isLoading, refetch: get };
};*/

/*export const useDeleteSchedule = () => {
  const [state, setState] = React.useState<DataState<ControlSchedule>>(initialState);
  const mutate = (schedule: DeleteScheduleRequest) => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    return axios.delete<DeleteScheduleRequest, Schedule>(baseurl + '/heatcontrol/schedule/').then((res) => {
      setState((current) =>
        Object.assign({}, current, { isLoading: false, data: res })
      );
    });
  };

  return { mutate, ...state, isFetching: state.isLoading };
};

export const usePriceHistory = () => {
  const [state, setState] = React.useState<DataState<ControlSchedule[]>>(initialState);

  const get = () => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    axios
      .get(baseUrl + '/heatcontrol/schedule')
      .then((res) => {
        const data = res.data.map((schedule: any) => {
          return {
            controlName: schedule.control_name,
            schedule: {
              id: schedule.rowid,
              from: schedule.from_date,
              to: schedule.to_date,
              state: schedule.state,
            }
          }
        })
        setState((current) =>
          Object.assign({}, current, { isLoading: false, data: data })
        )
      })
  }

  React.useEffect(() => {
    get();
  }, []);

  return { ...state, isFetching: state.isLoading, refetch: get };
};*/