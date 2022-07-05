/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
import Map from './Map'
import History from './History'
import Settings from './pages/Settings'
import About from './pages/About'
import { earthquake } from './DataHandler'
import { getMagnitudeColor } from './Utility'
import { SettingsIcon, AboutIcon, HistoryIcon } from './Icon'
import { useEffect, useState } from 'react'

import './App.css'
import './Style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/*
============================================================
Functions
============================================================
*/
function App () {
  return (
    <>
      <Map />
      <EarthquakeInformation />
      <AppButtonContainer />
      <MagnitudeScale />
    </>
  )
}

const EarthquakeInformation = () => {
  const [id, setId] = useState('')

  console.log(id)

  useEffect(() => {
    let stopUpdate = false
    const update = () => {
      if (stopUpdate) {
        return
      }
      if (earthquake.update) {
        if (earthquake.noData) {
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
        earthquake.updateMap = true
        earthquake.update = false
      }
      setTimeout(update, 1000)
    }
    update()
    return () => {
      stopUpdate = true
      earthquake.firstFetch = true
    }
  }, [])

  return (
    <>
      <EarthquakeCard earthquake={earthquake} />
      {earthquake.firstFetch && <MapSpinner />}
    </>
  )
}

const EarthquakeCard = (props) => {
  const { location, depth, magnitude } = props.earthquake

  return (
    <>
      <div className='earthquake-card shadow-lg text-light px-4 py-4'>
        <div className='row'>
          <div className='col-auto'>
            <h1 style={{ fontWeight: 'bold', color: getMagnitudeColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-auto pe-0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' className='bi bi-caret-down-fill' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' /></svg>
          </div>
          <div className='col-auto ps-2'>
            <p className='mb-0' style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{depth + ' km'}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='mb-0' style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{location}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const AppButtonContainer = () => {
  return (
    <>
      <AppButton style={{ position: 'fixed', left: '1.5rem', bottom: '8rem' }} icon={HistoryIcon({ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' })} window={History} />
      <AppButton style={{ position: 'fixed', left: '1.5rem', bottom: '3rem' }} icon={SettingsIcon({ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' })} window={Settings} />
      <AppButton style={{ position: 'fixed', right: '1.5rem', bottom: '3rem' }} icon={AboutIcon({ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' })} window={About} />
    </>
  )
}

const AppButton = (props) => {
  const [visible, setVisible] = useState(false)

  const window = props.window
  const closeWindowAction = () => {
    setVisible(false)
  }

  return (
    <>
      <div className='app-button shadow' style={props.style} onClick={() => { setVisible(true) }}>
        {props.icon}
      </div>
      {visible && window(closeWindowAction)}
    </>
  )
}

const MagnitudeScale = () => {
  return (
    <>
      <div className='text-center text-light'>
        <div className='magnitude-scale' style={{ position: 'fixed', right: '1.5rem', bottom: '18rem', backgroundColor: getMagnitudeColor(3) }}><div>3-</div></div>
        <div className='magnitude-scale' style={{ position: 'fixed', right: '1.5rem', bottom: '16rem', backgroundColor: getMagnitudeColor(4) }}><div>4</div></div>
        <div className='magnitude-scale' style={{ position: 'fixed', right: '1.5rem', bottom: '14rem', backgroundColor: getMagnitudeColor(5) }}><div>5</div></div>
        <div className='magnitude-scale' style={{ position: 'fixed', right: '1.5rem', bottom: '12rem', backgroundColor: getMagnitudeColor(6) }}><div>6</div></div>
        <div className='magnitude-scale' style={{ position: 'fixed', right: '1.5rem', bottom: '10rem', backgroundColor: getMagnitudeColor(7) }}><div>7</div></div>
        <div className='magnitude-scale' style={{ position: 'fixed', right: '1.5rem', bottom: '8rem', backgroundColor: getMagnitudeColor(8) }}><div>8+</div></div>
      </div>
    </>
  )
}

const MapSpinner = () => {
  return (
    <>
      <div id='spinner_container' className='d-flex justify-content-center px-3 py-3 map-spinner' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className='spinner-border text-danger' role='status' />
      </div>
    </>
  )
}

export default App
