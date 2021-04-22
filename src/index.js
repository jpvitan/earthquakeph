import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import List from './List';
import About from './About';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/'>
        <App />
      </Route>
      <Route exact path='/list'>
        <List />
      </Route>
      <Route exact path='/about'>
        <About />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
