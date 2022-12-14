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

function App () {
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {
    dataCycle.setOnUpdate((earthquake) => setEarthquake(earthquake))
    dataCycle.setOnError((error) => console.log(error))
    dataCycle.start()
  }, [])

  const globalProperties = { earthquake, configuration, dataCycle }

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
      <div />
    </>
  )
}

export default App
