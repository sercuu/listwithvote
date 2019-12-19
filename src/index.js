import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-less/semantic.less';

import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';

import history from './helpers/history';

import App from './App';

import './style/index.scss';

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
