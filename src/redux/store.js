import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';
import thunk from 'redux-thunk';
import resultReducer from './result-reducer';

const reducers = combineReducers({
  auth: authReducer,
  result: resultReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
