/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Configuration from './utility/Configuration'
import DataCycle from './utility/DataCycle'
import Map from './components/Map/Map'
import Earthquake from './components/Earthquake/Earthquake'
import Page from './components/Page/Page'
import { useState, useEffect } from 'react'
import './App.css'

const configuration = new Configuration(1, 10, 30, 'mapbox://styles/jpvitan/ckwjznqa44qhz14qnswqs0koo', 0, 50000)
const dataCycle = new DataCycle(configuration)
const display = { toggleLoadingVisibility: () => { }, toggleMessageScreen: () => { } }

function App () {
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {
    dataCycle.setOnUpdate((earthquake) => {
      display.toggleLoadingVisibility(false)

      if (earthquake.list.length === 0) {
        display.toggleMessageScreen(true, "No Data", "We can't find any data for your current configuration.")
        return
      }

      setEarthquake(earthquake)
    })
    dataCycle.setOnError((error) => {
      display.toggleMessageScreen(true, error.type, error.details)
    })
    dataCycle.start()
  }, [])

  const globalProperties = { earthquake, configuration, dataCycle, display }

  return (
    <>
      {
        earthquake &&
        <>
          <Map {...globalProperties} />
          <Earthquake {...globalProperties} />
          <Page {...globalProperties} />
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
    display.toggleLoadingVisibility = (visible) => setVisible(visible)
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
    display.toggleMessageScreen = (visible, title, message) => {
      setVisible(visible)
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
