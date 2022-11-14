import React from 'react';
import axios, { AxiosError } from 'axios';

import { ControlSchedule } from './common/types';

const baseUrl = 'http://localhost:8003'

type DataState<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: AxiosError | undefined;
};

const initialState = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const useSchedules = () => {
  const [state, setState] = React.useState<DataState<ControlSchedule[]>>(initialState);

  const get = () => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    axios
      .get<ControlSchedule[]>(baseUrl + '/heatcontrol/schedule')
      .then((res) =>
        setState((current) =>
          Object.assign({}, current, { isLoading: false, data: res.data })
        )
      );
  };

  React.useEffect(() => {
    get();
  }, []);

  return { ...state, isFetching: state.isLoading, refetch: get };
};