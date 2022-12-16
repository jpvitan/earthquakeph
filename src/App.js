/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Utility from './utility/Utility'
import Map from './components/Map/Map'
import Earthquake from './components/Earthquake/Earthquake'
import Page from './components/Page/Page'
import { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {
    Utility.dataCycle.setOnUpdate((previousEarthquake, earthquake) => {
      Utility.display.toggleLoadingVisibility(false)

      if (earthquake.list.length === 0) {
        Utility.display.toggleMessageScreen(true, 'No Results Found', "We can't find any results for your current configuration.")
        return
      }
      if (JSON.stringify(previousEarthquake) === JSON.stringify(earthquake)) {
        return
      }

      setEarthquake(earthquake)
    })
    Utility.dataCycle.setOnError((error) => {
      Utility.display.toggleMessageScreen(true, error.type, error.details)
    })
    Utility.dataCycle.setOnStatusChange((status) => {
      Utility.display.setIndicatorColor(Utility.getStatusColor(status))
    })
    Utility.dataCycle.start()
  }, [])

  return (
    <>
      {
        earthquake &&
          <>
            <Map earthquake={earthquake} />
            <Earthquake earthquake={earthquake} />
            <Page earthquake={earthquake} />
          </>
      }
      <LoadingScreen />
      <MessageScreen />
    </>
  )
}

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    Utility.display.toggleLoadingVisibility = (visible) => setVisible(visible)
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
  const [onClose, setOnClose] = useState(null)

  useEffect(() => {
    Utility.display.toggleMessageScreen = (visible, title, message, onClose) => {
      setVisible(visible)
      setTitle(title)
      setMessage(message)
      setOnClose(() => onClose)
    }
  }, [])

  const handleOnClose = () => {
    setVisible(false)
    onClose && onClose()
  }

  return (
    <>
      {visible &&
        <div className='w-100 h-100 message-screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center text-light'>
                <h1>{title}</h1>
                <p>{message}</p>
                <button className='btn btn-primary mt-3 px-5' onClick={handleOnClose}>OK</button>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default App
