import { createStore } from 'redux';
// import { createStore, compose, applyMiddleware  } from 'redux';
import { fromJS, Map } from 'immutable';
// import { createLogger } from 'redux-logger';
import { activateLogger } from '../config';

import reducer from './reducer';
import initialState from './initialState';


// const logger = activateLogger ?
//   createLogger({ stateTransformer: state => Map(state).toJS() }) :
//   store => next => action => (next(action)); // eslint-disable-line no-unused-vars

export let store = createStore(reducer, fromJS(initialState))
  // compose(applyMiddleware(logger)));