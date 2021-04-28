import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const reducers = combineReducers({
  reducer: reducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
