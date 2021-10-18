import api from '../api';
import { SwitchI } from '../components/common/forms/Switch';

const SET_RESULT_FORM = 'SET_RESULT_FORM';
const SET_EVENTS_DATE = 'SET_EVENTS_DATE';
const SET_TOKEN = 'SET_TOKEN';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_IS_SERVER_PROGRESS = 'SET_IS_SERVER_PROGRESS';
const SET_SERVER_ERROR_MESSAGE = 'SET_SERVER_ERROR_MESSAGE';
const SET_IS_COMPLETE = 'SET_IS_COMPLETE';
const SET_LIST_STATUS = 'SET_LIST_STATUS';
const SET_ERROR_500 = 'SET_ERROR_500';

export interface EventDate {
  id: number;
  label: string;
}

export interface ResultForm {
  fullName: string;
  birthday: string;
  companyName: string;
  position: string;
  phone: string;
  selectEventDate: EventDate;
  parkingCheckbox: boolean;
  handoutsCheckbox: boolean;
  needHelpCheckbox: boolean;
  switches: Array<SwitchI>;
}

const initialState = {
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
      { name: 'Физ. лицо', isSwitch: true },
      { name: 'Юр. лицо', isSwitch: false },
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

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_RESULT_FORM:
    case SET_EVENTS_DATE:
    case SET_TOKEN:
    case SET_IS_AUTH:
    case SET_IS_SERVER_PROGRESS:
    case SET_SERVER_ERROR_MESSAGE:
    case SET_IS_COMPLETE:
    case SET_LIST_STATUS:
    case SET_ERROR_500:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setResultForm = (resultForm: ResultForm) => ({
  type: SET_RESULT_FORM,
  payload: { resultForm },
});
export const setEventsDate = (eventsDate: EventDate) => ({
  type: SET_EVENTS_DATE,
  payload: { eventsDate },
});
export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: { token },
});
export const setIsAuth = (isAuth: boolean) => ({
  type: SET_IS_AUTH,
  payload: { isAuth },
});
export const setIsServerProgress = (isServerProgress: boolean) => ({
  type: SET_IS_SERVER_PROGRESS,
  payload: { isServerProgress },
});
export const setServerErrorMessage = (serverErrorMessage: string) => ({
  type: SET_SERVER_ERROR_MESSAGE,
  payload: { serverErrorMessage },
});
export const setIsComplete = (isComplete: boolean) => ({
  type: SET_IS_COMPLETE,
  payload: { isComplete },
});
export const setListStatus = (isListComplete: boolean) => ({
  type: SET_LIST_STATUS,
  payload: { isListComplete },
});
export const setError500 = (isError500: boolean) => ({
  type: SET_ERROR_500,
  payload: { isError500 },
});

const saveToken = (token: string) => (dispatch: any) => {
  sessionStorage.setItem('token', token);
  dispatch(setToken(token));
};

export const login = (email: string, password: string) => async (
  dispatch: any,
) => {
  try {
    dispatch(setServerErrorMessage(''));
    dispatch(setIsServerProgress(true));
    const response = await api.auth(email, password);
    saveToken(response.data.token)(dispatch);
    dispatch(setIsAuth(true));
  } catch (error: any) {
    if (error === undefined) {
      dispatch(setIsServerProgress(false));
      dispatch(setIsAuth(true));
      return;
    }
    switch (error.status) {
      case 400: {
        dispatch(setServerErrorMessage('Неверный email или пароль'));
        break;
      }
      case 500: {
        dispatch(setServerErrorMessage('Ошибка сервера'));
        break;
      }
      default: {
        dispatch(setServerErrorMessage(error.message));
        break;
      }
    }
  }
  dispatch(setIsServerProgress(false));
};

export const logout = () => (dispatch: any) => {
  saveToken('')(dispatch);
  dispatch(setIsAuth(false));
};

export const getListEventsDate = () => async (dispatch: any) => {
  try {
    setListStatus(false);
    setIsServerProgress(true);
    const response = await api.getList();
    setEventsDate(response.data.eventsDate);
    setListStatus(true);
  } catch (error: any) {
    if (error === undefined) {
      setListStatus(true);
      setIsServerProgress(false);
      return;
    }
    switch (error.status) {
      case 401: {
        saveToken('')(dispatch);
        setIsAuth(false);
        break;
      }
      case 500: {
        setError500(true);
        break;
      }

      default: {
        saveToken('')(dispatch);
        setIsAuth(false);
        setServerErrorMessage(error.message);
        break;
      }
    }
  }
  setIsServerProgress(false);
};

export const sendResultForm = (data: ResultForm) => async (dispatch: any) => {
  try {
    dispatch(setIsServerProgress(true));
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
    dispatch(setResultForm(data));
    await api.postForm(form);
    dispatch(setIsComplete(true));
  } catch (error: any) {
    if (error === undefined) {
      dispatch(setResultForm(data));
      dispatch(setIsComplete(true));
      dispatch(setIsServerProgress(false));
      dispatch(setIsComplete(false));
      return;
    }
    switch (error.status) {
      case 401: {
        dispatch(setServerErrorMessage('Ошибка авторизации'));
        saveToken('')(dispatch);
        dispatch(setIsAuth(false));
        break;
      }
      case 500: {
        dispatch(setError500(true));
        break;
      }

      default: {
        saveToken('')(dispatch);
        dispatch(setIsAuth(false));
        dispatch(setServerErrorMessage('Неизвестная ошибка'));
        break;
      }
    }
  }
  dispatch(setIsComplete(false));
  dispatch(setIsServerProgress(false));
  dispatch(setListStatus(false));
};

export default reducer;
