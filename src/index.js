/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './index.css'

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path='/' element={<App />}></Route>
    </Routes>
  </Router>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
