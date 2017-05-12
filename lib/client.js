import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin';
import './global.css'
import * as storage from 'redux-storage'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import * as reducers from './reducers'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const reducer = storage.reducer(combineReducers(reducers))
import createEngine from 'redux-storage-engine-indexed-db'
const engine = createEngine('flashcards')
const middleware = storage.createMiddleware(engine)
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware, middleware)(createStore)
const store = createStoreWithMiddleware(reducer)
const load = storage.createLoader(engine)
load(store)
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'))

// store.dispatch(fetchProducts(initialLoadSize))

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'))
