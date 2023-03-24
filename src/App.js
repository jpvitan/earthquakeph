/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { ScreenLoading, ScreenMessage } from './js/components/Screen'
import Configuration from './js/engine/Configuration'
import Engine from './js/engine/Engine'
import Control from './js/main/Control'
import Map from './js/main/Map'
import Panel from './js/main/Panel'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const location = 'Philippines'
const minMagnitude = 1
const maxMagnitude = 10
const plot = 50
const interval = 300
const appTheme = 'Black Pearl'
const mapTheme = 'Dark'
const zoom = 7.7
const showBoundingBox = false

const configuration = new Configuration(location, minMagnitude, maxMagnitude, plot, interval, appTheme, mapTheme, zoom, showBoundingBox)
const engine = new Engine(configuration)

const App = () => {
  const [earthquake, setEarthquake] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ visible: false })

  useEffect(() => {
    engine.setOnUpdate((previous, earthquake, forced) => {
      setLoading(false)
      if (earthquake.list.length === 0) {
        return
      }
      if (JSON.stringify(previous) === JSON.stringify(earthquake) && !forced) return
      setEarthquake(earthquake)
    })
    engine.setOnError((error) => {
      setMessage({ visible: true, title: error.type, message: error.details, onClose: () => { setMessage({ visible: false }) } })
    })
    engine.start()

    configuration.setAppTheme()
  }, [])

  return (
    <div id='app' className={configuration.getAppTheme().className}>
      {
        earthquake &&
          <>
            <Map configuration={configuration} engine={engine} earthquake={earthquake} />
            <Panel configuration={configuration} engine={engine} earthquake={earthquake} />
            <Control configuration={configuration} engine={engine} earthquake={earthquake} />
          </>
      }
      <ScreenLoading visible={loading} />
      <ScreenMessage {...message} />
    </div>
  )
}

export default App
