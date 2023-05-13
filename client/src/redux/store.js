import { createStore, applyMiddleware } from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';


// const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  // composeEnhanced(applyMiddleware(thunkMiddleware))
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;