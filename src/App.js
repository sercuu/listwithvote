import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import rooterModel from './routeModel';
import DefaultLayout from './components/Layout/Default';

const App = () => {
  return (
    <DefaultLayout>
      <Switch>
        {rooterModel.map(item => {
          return <Route path={item.path} exact component={item.component} key={item.name} />;
        })}
        <Route path="/" render={() => <Redirect to="/list" />} />
      </Switch>
    </DefaultLayout>
  );
};

export default App;
