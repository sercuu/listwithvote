import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import rooterModel from './routeModel';

const App = () => {
  return (
    <Switch>
      {rooterModel.map(item => {
        return <Route path={item.path} exact component={item.component} key={item.name} />;
      })}
      <Route path="/" render={() => <Redirect to="/list" />} />
    </Switch>
  );
};

export default App;
