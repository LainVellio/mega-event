import api from '../api';
import store from './store';

const SET_AUTH = 'SET_AUTH';
const SET_TOKEN = 'SET_TOKEN';
const SERVER_IN_PROGRESS = 'SERVER_IN_PROGRESS';
const SET_EVENTS_DATE = 'SET_EVENTS_DATE';
const SELECT_DATE_ITEM = 'SELECT_DATE_ITEM';
const SET_COMPLETED_FORM = 'SET_COMPLETED_FORM';
const SET_COMPLETE = 'SET_COMPLETE';
const SET_SERVER_ERROR_MESSAGE = 'SET_SERVER_ERROR_MESSAGE';
const SET_ERROR_500 = 'SET_ERROR_500';
const SET_LIST_STATUS = 'SET_LIST_STATUS';

const initialState = {
  isAuth: false,
  token: '',
  isServerProgress: false,
  eventsDate: [],
  completedForm: { checkbox: [], inputs: [], switch: true },
  isComplete: false,
  serverErrorMessage: '',
  isError500: false,
  isListComplete: false,
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

    case SELECT_DATE_ITEM: {
      return {
        ...state,
        eventsDate: state.eventsDate.map((i) =>
          i.id === Number(action.id)
            ? { ...i, isSelected: true }
            : { ...i, isSelected: false },
        ),
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
export const selectDateItem = (id) => ({
  type: SELECT_DATE_ITEM,
  id,
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

export const sendResultForm = (completedForm) => (dispatch) => {
  dispatch(serverInProgress(true));
  const event = store.getState().reducer.eventsDate.find((i) => i.isSelected);
  const opts = completedForm.checkbox
    .map((i) => i.checked && { [`opt${i.id + 1}`]: 1 })
    .reduce((result, current) => Object.assign(result, current));
  const personalData = completedForm.switch
    ? {
        name: completedForm.inputs[0].value,
        dob: completedForm.inputs[1].value,
        phone: completedForm.inputs[2].value,
      }
    : {
        cName: completedForm.inputs[3].value,
        pos: completedForm.inputs[4].value,
        phone: completedForm.inputs[5].value,
      };
  const form = {
    ...personalData,
    eventId: event.id,
    ...opts,
  };
  api.postForm(store.getState().reducer.token, form).then((response) => {
    switch (response.status) {
      case 200: {
        dispatch(setCompletedForm(completedForm));
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
