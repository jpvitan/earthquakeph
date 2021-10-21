/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

// JavaScript
import App from './App';
import List from './List';
import About from './About';
import Settings from './Settings';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CSS
import './index.css';

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
      <Route exact path='/settings'>
        <Settings />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
