import { EventDate, ResultForm } from './interfaces';
import { ActionTypes } from './reducer';

function inferLiteralFromString<T extends string>(arg: T): T {
  return arg;
}

export const setToken = (token: string) => ({
  type: inferLiteralFromString(ActionTypes.SET_TOKEN),
  token,
});
export const setResultForm = (resultForm: ResultForm) => ({
  type: inferLiteralFromString(ActionTypes.SET_RESULT_FORM),
  resultForm,
});
export const setEventsDate = (eventsDate: EventDate[]) => ({
  type: inferLiteralFromString(ActionTypes.SET_EVENTS_DATE),
  eventsDate,
});
export const setIsAuth = (isAuth: boolean) => ({
  type: inferLiteralFromString(ActionTypes.SET_IS_AUTH),
  isAuth,
});
export const setIsServerProgress = (isServerProgress: boolean) => ({
  type: inferLiteralFromString(ActionTypes.SET_IS_SERVER_PROGRESS),
  isServerProgress,
});
export const setServerErrorMessage = (serverErrorMessage: string) => ({
  type: inferLiteralFromString(ActionTypes.SET_SERVER_ERROR_MESSAGE),
  serverErrorMessage,
});
export const setIsComplete = (isComplete: boolean) => ({
  type: inferLiteralFromString(ActionTypes.SET_IS_COMPLETE),
  isComplete,
});
export const setListStatus = (isListComplete: boolean) => ({
  type: inferLiteralFromString(ActionTypes.SET_LIST_STATUS),
  isListComplete,
});
export const setError500 = (isError500: boolean) => ({
  type: inferLiteralFromString(ActionTypes.SET_ERROR_500),
  isError500,
});
