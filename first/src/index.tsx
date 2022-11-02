import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'App';
import reportWebVitals from './reportWebVitals';
import {Provider, RootStateOrAny} from 'react-redux';

ReactDOM.render(
  <Provider store={{} as RootStateOrAny}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
