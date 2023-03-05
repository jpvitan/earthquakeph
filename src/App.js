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
import Earthquake from './js/main/Earthquake'
import Map from './js/main/Map'
import Panel from './js/main/Panel'
import Utility from './js/utilities/Utility'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const App = () => {
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {
    Utility.display.setWebsiteTint(Utility.configuration.getAppTheme().color)

    Utility.dataCycle.setOnUpdate((previousEarthquake, earthquake, forcedUpdate) => {
      Utility.display.toggleLoadingVisibility(false)
      if (earthquake.list.length === 0) {
        Utility.display.toggleMessageScreen(true, 'No Results Found', "We can't find any results for your current configuration.")
        return
      }
      if (JSON.stringify(previousEarthquake) === JSON.stringify(earthquake) && !forcedUpdate) return
      setEarthquake(earthquake)
    })
    Utility.dataCycle.setOnError((error) => { Utility.display.toggleMessageScreen(true, error.type, error.details) })
    Utility.dataCycle.setOnStatusChange((status) => { Utility.display.setIndicatorColor(Utility.status.getColor(status)) })

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
      <ScreenLoading />
      <ScreenMessage />
    </div>
  )
}

export default App
