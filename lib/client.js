import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import persistState from 'redux-localstorage'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const middlwares = applyMiddleware(thunkMiddleware, loggerMiddleware)
const enhancer = compose(middlwares, persistState(['words']))
const store = createStore(rootReducer, enhancer)

// store.dispatch(fetchProducts(initialLoadSize))

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'));
