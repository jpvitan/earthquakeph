/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { toggleLoadingVisibility } from '../App'
import { setCoordinates } from './Map'
import { earthquake, cycle, fetchData } from '../api/DataHandler'
import { configuration } from '../pages/Settings'
import { getMagnitudeColor } from '../utility/Utility'
import { useEffect, useState } from 'react'
import './Earthquake.css'
import warningSign from '../assets/img/warning.png'
import tsunamiSign from '../assets/img/tsunami.png'

export let updateEarthquake = () => { }
export let setFetchIndicatorColor = () => { }

const Earthquake = () => {
  const [id, setId] = useState('')

  console.log(id)

  useEffect(() => {
    let stopUpdate = false

    let fetchDataCycleCounter = 0
    const fetchDataCycle = () => {
      if (stopUpdate) return
      if (fetchDataCycleCounter++ % configuration.updateInterval === 0) fetchData()
      setTimeout(fetchDataCycle, 1000)
    }

    updateEarthquake = () => {
      if (cycle.noData) {
        earthquake.id = ''
        earthquake.location = 'No Available Data'
        earthquake.latitude = 0.0
        earthquake.longitude = 0.0
        earthquake.depth = 0.0
        earthquake.time = null
        earthquake.magnitude = 0.0
        earthquake.tsunami = ''
        setId('n/a')
      } else {
        setId(earthquake.id)
      }
      toggleLoadingVisibility(false)
    }

    fetchDataCycle()

    return () => {
      stopUpdate = true
    }
  }, [])

  return (
    <>
      <EarthquakeCard earthquake={earthquake} />
      <TsunamiSign tsunami={earthquake.tsunami} />
      <MagnitudeScale />
    </>
  )
}

const EarthquakeCard = (props) => {
  const { location, latitude, longitude, depth, magnitude } = props.earthquake

  return (
    <>
      <div className='earthquake-card shadow-lg text-light px-4 py-4' onClick={() => setCoordinates(longitude, latitude)}>
        <div className='row mb-2'>
          <div className='col-auto'>
            <h1 className='my-0' style={{ fontWeight: 'bold', color: getMagnitudeColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
          </div>
          <WarningSign magnitude={magnitude} />
        </div>
        <div className='row'>
          <div className='col-auto pe-0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' className='bi bi-caret-down-fill' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' /></svg>
          </div>
          <div className='col-auto ps-2'>
            <p className='mb-0'>{depth + ' km'}</p>
          </div>
          <div className='col-auto my-auto px-0'>
            <FetchIndicator />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='mb-0'>{location}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const WarningSign = ({ magnitude }) => {
  return (
    <>
      {magnitude >= 6 &&
        <div className='col-auto my-auto px-0'>
          <img id='warning-sign' src={warningSign} alt='Warning Sign' width={35} height={35} />
        </div>}
    </>
  )
}

const FetchIndicator = () => {
  const [color, setColor] = useState('#95a5a6')
  useEffect(() => { setFetchIndicatorColor = (color) => setColor(color) }, [])

  return (
    <>
      <div id='fetch-indicator' className='shadow-lg' style={{ backgroundColor: color }} />
    </>
  )
}

const TsunamiSign = ({ tsunami }) => {
  return (
    <>
      {tsunami === 1 && <img id='tsunami-sign' src={tsunamiSign} alt='Tsunami Sign' width={24} height={21} />}
    </>
  )
}

const MagnitudeScale = () => {
  return (
    <>
      <div className='magnitude-scale'>
        <div style={{ bottom: '18rem', backgroundColor: getMagnitudeColor(3) }}><p>3-</p></div>
        <div style={{ bottom: '16rem', backgroundColor: getMagnitudeColor(4) }}><p>4</p></div>
        <div style={{ bottom: '14rem', backgroundColor: getMagnitudeColor(5) }}><p>5</p></div>
        <div style={{ bottom: '12rem', backgroundColor: getMagnitudeColor(6) }}><p>6</p></div>
        <div style={{ bottom: '10rem', backgroundColor: getMagnitudeColor(7) }}><p>7</p></div>
        <div style={{ bottom: '8rem', backgroundColor: getMagnitudeColor(8) }}><p>8+</p></div>
      </div>
    </>
  )
}

export default Earthquake
