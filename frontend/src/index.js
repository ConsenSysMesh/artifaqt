import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware  } from 'redux';
import { fromJS, Map } from 'immutable';
import { createLogger } from 'redux-logger';

import reducer from './store/reducer';
import initialState from './store/initialState';
import './index.css';
import App from './components/App';

let store = createStore(reducer, fromJS(initialState),
  compose(applyMiddleware(createLogger({ stateTransformer: state => Map(state).toJS() }))));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

