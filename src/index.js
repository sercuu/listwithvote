import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './helpers/history';
import App from './App';
import './index.css';

const Root = () => (
  <Router history={history}>
    <App />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
