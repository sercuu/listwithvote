import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'semantic-ui-less/semantic.less';

import history from './helpers/history';
import { GlobalStateProvider } from './context/GlobalContext';

import App from './App';

import './style/index.scss';

const Root = () => (
  <GlobalStateProvider>
    <Router history={history}>
      <App />
    </Router>
  </GlobalStateProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
