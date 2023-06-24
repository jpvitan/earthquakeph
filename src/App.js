/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { ScreenLoading, ScreenMessage, ScreenContent } from './js/components/Screen'
import Engine from './js/engine/Engine'
import Control from './js/main/Control'
import Map from './js/main/Map'
import Panel from './js/main/Panel'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const configuration = {
  app: {
    theme: { name: 'Black Pearl', className: 'theme-black-pearl', color: '#1e272c' }
  },
  engine: {
    source: process.env.REACT_APP_SOURCE,
    auxiliary: process.env.REACT_APP_AUXILIARY,
    location: { name: 'Philippines', area: [2, 22, 116, 130], code: 'PH', verified: true },
    minMagnitude: 1,
    maxMagnitude: 10,
    plot: 50,
    interval: 300,
    pause: false
  },
  map: {
    theme: { name: 'Dark', url: 'mapbox://styles/jpvitan/ckwjznqa44qhz14qnswqs0koo' },
    zoom: 7.8,
    showBoundingBox: false
  }
}

const engine = new Engine(configuration.engine)

const App = () => {
  const [earthquake, setEarthquake] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    engine.setOnUpdate((previous, earthquake, forced) => {
      setLoading(false)
      if (earthquake.list.length === 0) {
        setMessage({ title: 'No Results Found', message: 'There are no available results for your current configuration. Please check your settings and try again.', onClose: () => { setMessage(null) } })
        return
      }
      if (JSON.stringify(previous) === JSON.stringify(earthquake) && !forced) {
        return
      }
      setEarthquake(earthquake)
    })
    engine.setOnError((error) => { setMessage({ title: error.type, message: error.details, onClose: () => { setMessage(null) } }) })
    engine.start()

    configuration.app.toggleLoading = (loading) => { setLoading(loading) }
    configuration.app.toggleMessage = (message) => { setMessage(message) }
    configuration.app.toggleContent = (content) => { setContent(content) }
  }, [])

  return (
    <div id='app' className={configuration.app.theme.className}>
      {
        earthquake &&
          <div className='main'>
            <Map
              configuration={configuration}
              engine={engine}
              earthquake={earthquake}
            />
            <Panel
              key={earthquake.updateCount}
              configuration={configuration}
              engine={engine}
              earthquake={earthquake}
            />
            <Control
              configuration={configuration}
              engine={engine}
              earthquake={earthquake}
            />
          </div>
      }
      <Screen
        loading={loading}
        message={message}
        content={content}
      />
    </div>
  )
}

const Screen = ({ loading, message, content }) => {
  return (
    <div>
      {loading && <ScreenLoading />}
      {message && <ScreenMessage {...message} />}
      {content && <ScreenContent {...content} />}
    </div>
  )
}

export default App
