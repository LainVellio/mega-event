import { Dispatch } from 'redux';

import api from '../api';
import * as actions from './action-creators';
import { InitialState, ResultForm } from './interfaces';

export enum ActionTypes {
  SET_RESULT_FORM = 'SET_RESULT_FORM',
  SET_EVENTS_DATE = 'SET_EVENTS_DATE',
  SET_TOKEN = 'SET_TOKEN',
  SET_IS_AUTH = 'SET_IS_AUTH',
  SET_IS_SERVER_PROGRESS = 'SET_IS_SERVER_PROGRESS',
  SET_SERVER_ERROR_MESSAGE = 'SET_SERVER_ERROR_MESSAGE',
  SET_IS_COMPLETE = 'SET_IS_COMPLETE',
  SET_LIST_STATUS = 'SET_LIST_STATUS',
  SET_ERROR_500 = 'SET_ERROR_500',
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
type TAction = ReturnType<InferValueTypes<typeof actions>>;

export enum QuestionarySwitchesName {
  individual = 'Физ. лицо',
  entity = 'Юр. лицо',
}

const initialState: InitialState = {
  resultForm: {
    fullName: '',
    birthday: '',
    companyName: '',
    position: '',
    phone: '',
    selectEventDate: {
      id: 0,
      label: '',
    },
    parkingCheckbox: false,
    handoutsCheckbox: false,
    needHelpCheckbox: false,
    switches: [
      { name: QuestionarySwitchesName.individual, isSwitch: true },
      { name: QuestionarySwitchesName.entity, isSwitch: false },
    ],
  },
  eventsDate: [
    {
      id: 1,
      label: '24 апреля 2021 года',
    },
    {
      id: 2,
      label: '3 мая 2021 года',
    },
    {
      id: 3,
      label: '20 июня 2021 года',
    },
    {
      id: 4,
      label: '10 августа 2021 года',
    },
    {
      id: 5,
      label: '15 мая 2022 года',
    },
  ],
  token: '',
  isAuth: false,
  isServerProgress: false,
  serverErrorMessage: '',
  isComplete: false,
  isListComplete: false,
  isError500: false,
};

const reducer = (state = initialState, action: TAction): InitialState => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.token };
    case ActionTypes.SET_RESULT_FORM:
      return { ...state, resultForm: action.resultForm };
    case ActionTypes.SET_EVENTS_DATE:
      return { ...state, eventsDate: action.eventsDate };
    case ActionTypes.SET_IS_AUTH:
      return { ...state, isAuth: action.isAuth };
    case ActionTypes.SET_IS_SERVER_PROGRESS:
      return { ...state, isServerProgress: action.isServerProgress };
    case ActionTypes.SET_SERVER_ERROR_MESSAGE:
      return { ...state, serverErrorMessage: action.serverErrorMessage };
    case ActionTypes.SET_IS_COMPLETE:
      return { ...state, isComplete: action.isComplete };
    case ActionTypes.SET_LIST_STATUS:
      return { ...state, isListComplete: action.isListComplete };
    case ActionTypes.SET_ERROR_500:
      return { ...state, isError500: action.isError500 };
    default:
      return state;
  }
};

const saveToken = (token: string) => (dispatch: Dispatch<TAction>) => {
  sessionStorage.setItem('token', token);
  dispatch(actions.setToken(token));
};

export const login = (email: string, password: string) => async (
  dispatch: Dispatch<TAction>,
) => {
  try {
    dispatch(actions.setServerErrorMessage(''));
    dispatch(actions.setIsServerProgress(true));
    const response = await api.auth(email, password);
    saveToken(response.data.token)(dispatch);
    dispatch(actions.setIsAuth(true));
  } catch (error: any) {
    if (error === undefined) {
      dispatch(actions.setIsServerProgress(false));
      dispatch(actions.setIsAuth(true));
      return;
    }
    switch (error.status) {
      case 400: {
        dispatch(actions.setServerErrorMessage('Неверный email или пароль'));
        break;
      }
      case 500: {
        dispatch(actions.setServerErrorMessage('Ошибка сервера'));
        break;
      }
      default: {
        dispatch(actions.setServerErrorMessage(error.message));
        break;
      }
    }
  }
  dispatch(actions.setIsServerProgress(false));
};

export const logout = () => (dispatch: Dispatch<TAction>) => {
  saveToken('')(dispatch);
  dispatch(actions.setIsAuth(false));
};

export const getListEventsDate = () => async (dispatch: Dispatch<TAction>) => {
  try {
    dispatch(actions.setListStatus(false));
    dispatch(actions.setIsServerProgress(true));
    const response = await api.getList();
    dispatch(actions.setEventsDate(response.data.eventsDate));
    dispatch(actions.setListStatus(true));
  } catch (error: any) {
    if (error === undefined) {
      dispatch(actions.setListStatus(true));
      dispatch(actions.setIsServerProgress(false));
      return;
    }
    switch (error.status) {
      case 401: {
        saveToken('')(dispatch);
        dispatch(actions.setIsAuth(false));
        break;
      }
      case 500: {
        dispatch(actions.setError500(true));
        break;
      }

      default: {
        saveToken('')(dispatch);
        dispatch(actions.setIsAuth(false));
        dispatch(actions.setServerErrorMessage(error.message));
        break;
      }
    }
  }
  dispatch(actions.setIsServerProgress(false));
};

export const sendResultForm = (data: ResultForm) => async (
  dispatch: Dispatch<TAction>,
) => {
  try {
    dispatch(actions.setIsServerProgress(true));
    const commonData = {
      phone: data.phone,
      eventId: data.selectEventDate.id,
    };
    const specialData = data.switches[0].isSwitch
      ? {
          name: data.fullName,
          dob: data.birthday,
        }
      : {
          cName: data.companyName,
          pos: data.position,
        };
    const opt1 = data.parkingCheckbox
      ? {
          opt1: 1,
        }
      : null;
    const opt2 = data.handoutsCheckbox
      ? {
          opt2: 1,
        }
      : null;
    const opt3 = data.needHelpCheckbox
      ? {
          opt3: 1,
        }
      : null;
    const form = Object.assign(commonData, specialData, opt1, opt2, opt3);
    dispatch(actions.setResultForm(data));
    await api.postForm(form);
    dispatch(actions.setIsComplete(true));
  } catch (error: any) {
    if (error === undefined) {
      dispatch(actions.setResultForm(data));
      dispatch(actions.setIsComplete(true));
      dispatch(actions.setIsServerProgress(false));
      dispatch(actions.setIsComplete(false));
      return;
    }
    switch (error.status) {
      case 401: {
        dispatch(actions.setServerErrorMessage('Ошибка авторизации'));
        saveToken('')(dispatch);
        dispatch(actions.setIsAuth(false));
        break;
      }
      case 500: {
        dispatch(actions.setError500(true));
        break;
      }

      default: {
        saveToken('')(dispatch);
        dispatch(actions.setIsAuth(false));
        dispatch(actions.setServerErrorMessage('Неизвестная ошибка'));
        break;
      }
    }
  }
  dispatch(actions.setIsComplete(false));
  dispatch(actions.setIsServerProgress(false));
  dispatch(actions.setListStatus(false));
};

export default reducer;
