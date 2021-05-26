import api from '../api';
import store from './store';

const SET_AUTH = 'SET_AUTH';
const SET_TOKEN = 'SET_TOKEN';
const SERVER_IN_PROGRESS = 'SERVER_IN_PROGRESS';

const SET_EVENTS_DATE = 'SET_EVENTS_DATE';
const SET_COMPLETED_FORM = 'SET_COMPLETED_FORM';
const SET_COMPLETE = 'SET_COMPLETE';
const SET_SERVER_ERROR_MESSAGE = 'SET_SERVER_ERROR_MESSAGE';
const SET_ERROR_500 = 'SET_ERROR_500';
const SET_LIST_STATUS = 'SET_LIST_STATUS';

const initialState = {
  isAuth: false,
  token: '',
  isServerProgress: false,
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
  completedForm: {},
  serverErrorMessage: '',
  isComplete: false,
  isListComplete: false,
  isError500: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };

    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case SERVER_IN_PROGRESS: {
      return {
        ...state,
        isServerProgress: action.isServerProgress,
      };
    }

    case SET_EVENTS_DATE: {
      return {
        ...state,
        eventsDate: action.eventsDate.map((i) => ({ ...i, isSelected: false })),
      };
    }

    case SET_COMPLETED_FORM: {
      return {
        ...state,
        completedForm: action.completedForm,
      };
    }
    case SET_COMPLETE: {
      return {
        ...state,
        isComplete: action.isComplete,
      };
    }

    case SET_SERVER_ERROR_MESSAGE: {
      return {
        ...state,
        serverErrorMessage: action.serverErrorMessage,
      };
    }

    case SET_ERROR_500: {
      return {
        ...state,
        isError500: action.isError500,
      };
    }

    case SET_LIST_STATUS: {
      return {
        ...state,
        isListComplete: action.isListComplete,
      };
    }

    default:
      return state;
  }
};

export const authMe = (isAuth) => ({
  type: SET_AUTH,
  isAuth,
});
export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});
export const serverInProgress = (isServerProgress) => ({
  type: SERVER_IN_PROGRESS,
  isServerProgress,
});
export const setEventsDate = (eventsDate) => ({
  type: SET_EVENTS_DATE,
  eventsDate,
});
export const setCompletedForm = (completedForm) => ({
  type: SET_COMPLETED_FORM,
  completedForm,
});
export const setComplete = (isComplete) => ({
  type: SET_COMPLETE,
  isComplete,
});
export const setServerErrorMessage = (serverErrorMessage) => ({
  type: SET_SERVER_ERROR_MESSAGE,
  serverErrorMessage,
});
export const setError500 = (isError500) => ({
  type: SET_ERROR_500,
  isError500,
});
export const setListStatus = (isListComplete) => ({
  type: SET_LIST_STATUS,
  isListComplete,
});

export const login = (email, password) => (dispatch) => {
  dispatch(setServerErrorMessage(''));
  dispatch(serverInProgress(true));
  api.auth(email, password).then((response) => {
    if (response === undefined) {
      dispatch(serverInProgress(false));
      dispatch(authMe(true));
      return;
    }
    switch (response.status) {
      case 200: {
        dispatch(setToken(response.data.token));
        dispatch(authMe(true));
        break;
      }
      case 400: {
        dispatch(setServerErrorMessage('Неверный email или пароль'));
        break;
      }
      case 500: {
        dispatch(setServerErrorMessage('Ошибка сервера'));
        break;
      }

      default: {
        dispatch(setServerErrorMessage('Неизвестная ошибка'));
        break;
      }
    }
    dispatch(serverInProgress(false));
  });
};

export const getListEventsDate = () => (dispatch) => {
  dispatch(setListStatus(false));
  dispatch(serverInProgress(true));
  api.getList(store.getState().reducer.token).then((response) => {
    if (response === undefined) {
      dispatch(setListStatus(true));
      dispatch(serverInProgress(false));
      return;
    }
    switch (response.status) {
      case 200: {
        dispatch(setEventsDate(response.data.eventsDate));
        dispatch(setListStatus(true));
        break;
      }
      case 401: {
        dispatch(setServerErrorMessage('Ошибка авторизации'));
        dispatch(setToken(''));
        dispatch(authMe(false));
        break;
      }
      case 500: {
        dispatch(setError500(true));
        break;
      }

      default: {
        dispatch(setToken(''));
        dispatch(authMe(false));
        dispatch(setServerErrorMessage('Неизвестная ошибка'));
        break;
      }
    }
    dispatch(serverInProgress(false));
  });
};

export const sendResultForm = (data) => (dispatch) => {
  dispatch(serverInProgress(true));
  const commonData = {
    phone: data.phone,
    eventId: data.selectEventDate.id,
  };
  const specialData = data.switch
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

  api.postForm(store.getState().reducer.token, form).then((response) => {
    if (response === undefined) {
      dispatch(setCompletedForm(data));
      dispatch(setComplete(true));
      dispatch(serverInProgress(false));
      dispatch(setComplete(false));
      return;
    }
    switch (response.status) {
      case 200: {
        dispatch(setCompletedForm(data));
        dispatch(setComplete(true));
        break;
      }
      case 401: {
        dispatch(setServerErrorMessage('Ошибка авторизации'));
        dispatch(setToken(''));
        dispatch(authMe(false));
        break;
      }
      case 500: {
        dispatch(setError500(true));
        break;
      }

      default: {
        dispatch(setToken(''));
        dispatch(authMe(false));
        dispatch(setServerErrorMessage('Неизвестная ошибка'));
        break;
      }
    }
    dispatch(setComplete(false));
    dispatch(serverInProgress(false));
  });
};

export default reducer;
