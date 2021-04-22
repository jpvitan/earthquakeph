import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import List from './List';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/'>
        <App />
      </Route>
      <Route exact path='/list'>
        <List />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
