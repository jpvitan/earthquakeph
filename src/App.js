/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Utility from './utility/Utility'
import Earthquake from './components/Earthquake'
import Map from './components/Map'
import Panel from './components/Panel'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

function App () {
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {
    Utility.display.setWebsiteTint(Utility.configuration.getAppTheme().color)
    Utility.dataCycle.setOnUpdate((previousEarthquake, earthquake, forcedUpdate) => {
      Utility.display.toggleLoadingVisibility(false)

      if (earthquake.list.length === 0) {
        Utility.display.toggleMessageScreen(true, 'No Results Found', "We can't find any results for your current configuration.")
        return
      }
      if (JSON.stringify(previousEarthquake) === JSON.stringify(earthquake) && !forcedUpdate) {
        return
      }

      setEarthquake(earthquake)
    })
    Utility.dataCycle.setOnError((error) => {
      Utility.display.toggleMessageScreen(true, error.type, error.details)
    })
    Utility.dataCycle.setOnStatusChange((status) => {
      Utility.display.setIndicatorColor(Utility.status.getColor(status))
    })
    Utility.dataCycle.start()
  }, [])

  return (
    <div id='app' className={Utility.configuration.getAppTheme().className}>
      {
        earthquake &&
        <>
          {/* <Map earthquake={earthquake} /> */}
          <Earthquake earthquake={earthquake} />
          <Panel earthquake={earthquake} />
        </>
      }
      <LoadingScreen />
      <MessageScreen />
    </div>
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
        <div className='screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center'>
                <img className='shadow mb-4' alt='EarthquakePH' src='apple-touch-icon.png' width={70} height={70} />
                <div className='d-flex justify-content-center mb-5'>
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
        <div className='screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center'>
                <p className='text-size-xl'>{title}</p>
                <p>{message}</p>
                <button className='button button-color-orange btn shadow-lg mt-3 px-4 py-2' onClick={handleOnClose}>Close</button>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default App
