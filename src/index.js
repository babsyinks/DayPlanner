import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './client/Container';
import {Provider} from 'react-redux';
import {store} from './client/reducers/Reducer';

ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <Container />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);



