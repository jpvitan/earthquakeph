/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Configuration from './js/engine/Configuration'
import Engine from './js/engine/Engine'
import Earthquake from './js/main/Earthquake'
// import Map from './js/main/Map'
import Panel from './js/main/Panel'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const configuration = new Configuration('Philippines', 1, 10, 50, 300, 'Black Pearl', 'Dark', 7.7, false)
const engine = new Engine(configuration)

const App = () => {
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {
    engine.setOnUpdate((previousEarthquake, earthquake, forcedUpdate) => {
      // Control.display.toggleLoadingVisibility(false)
      if (earthquake.list.length === 0) {
        // Control.display.toggleMessageScreen(true, 'No Results Found', "We can't find any results for your current configuration.")
        return
      }
      if (JSON.stringify(previousEarthquake) === JSON.stringify(earthquake) && !forcedUpdate) return
      setEarthquake(earthquake)
    })
    // engine.setOnError((error) => { Control.display.toggleMessageScreen(true, error.type, error.details) })
    // Control.engine.setOnStatusChange((status) => { Control.display.setIndicatorColor('black') })
    engine.start()

    // Control.display.setWebsiteTint(Control.configuration.getAppTheme().color)
  }, [])

  return (
    <div id='app' className={configuration.getAppTheme().className}>
      {
        earthquake &&
        <>
          {/* <Map earthquake={earthquake} /> */}
          <Earthquake earthquake={earthquake} />
          <Panel earthquake={earthquake} />
        </>
      }
    </div>
  )
}

export default App
