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
import { configuration } from './pages/Settings'
import DataCycle from './api/DataCycle'
import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {
    const onUpdate = (updatedEarthquake) => {
      setEarthquake(updatedEarthquake)
    }
    const onError = (error) => {
      console.log(error)
    }
    const dataCycle = new DataCycle(configuration, onUpdate, onError)
    dataCycle.start()
  }, [])

  return (
    <>
      {
        earthquake &&
        <>
          <Map earthquake={earthquake} configuration={configuration} />
          <Earthquake earthquake={earthquake} configuration={configuration} />
          <Page earthquake={earthquake} configuration={configuration} />
        </>
      }
      <div></div>
    </>
  )
}

export default App
