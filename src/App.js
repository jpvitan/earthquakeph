/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Map from './components/Map'
import Earthquake from './components/Earthquake'
import Page from './pages/Page'
import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export let toggleLoadingVisibility = () => { }
export let toggleMessageScreen = () => { }

function App () {
  return (
    <>
      <Map />
      <Earthquake />
      <Page />
      <LoadingScreen />
      <MessageScreen />
    </>
  )
}

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    toggleLoadingVisibility = (visible) => setVisible(visible)
  }, [])

  return (
    <>
      {visible &&
        <div className='w-100 h-100 loading-screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center text-light'>
                <img className='img-fluid shadow mb-4' alt='earthquakeph' src='apple-touch-icon.png' width={70} height={70} />
                <div id='spinner_container' className='d-flex justify-content-center mb-5'>
                  <div className='spinner-border text-danger' role='status' />
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

const MessageScreen = () => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    toggleMessageScreen = (title, message) => {
      setVisible(true)
      setTitle(title)
      setMessage(message)
    }
  }, [])

  return (
    <>
      {visible &&
        <div className='w-100 h-100 message-screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center text-light'>
                <h1>{title}</h1>
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default App
