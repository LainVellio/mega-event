import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './authReducer';
import resultReducer from './resultReducer';

const reducers = combineReducers({
  auth: authReducer,
  result: resultReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
