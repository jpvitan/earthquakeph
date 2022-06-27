/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.css'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

/*
============================================================
ReactDOM
============================================================
*/
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/'>
        <App />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
