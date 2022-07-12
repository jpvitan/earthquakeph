/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Map from './components/Map'
import About from './pages/About'
import History from './pages/History'
import Settings from './pages/Settings'
import { earthquake } from './api/DataHandler'
import { SettingsIcon, AboutIcon, HistoryIcon, CloseIcon } from './components/Icon'
import { getMagnitudeColor } from './Utility'
import { useEffect, useState } from 'react'
import './App.css'
import './css/Pages.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <>
      <Map />
      <EarthquakeInformation />
      <AppButtonContainer />
      <MagnitudeScale />
      <LoadingScreen />
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
            <p className='mb-0'>{depth + ' km'}</p>
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

const AppButtonContainer = () => {
  const iconStyle = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }
  return (
    <>
      <AppButton name='about' content={About} icon={AboutIcon(iconStyle)} style={{ position: 'fixed', right: '1.5rem', bottom: '3rem' }} />
      <AppButton name='history' content={History} icon={HistoryIcon(iconStyle)} style={{ position: 'fixed', left: '1.5rem', bottom: '8rem' }} />
      <AppButton name='settings' content={Settings} icon={SettingsIcon(iconStyle)} style={{ position: 'fixed', left: '1.5rem', bottom: '3rem' }} />
    </>
  )
}

const AppButton = (props) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div className='app-button shadow-lg' style={props.style} onClick={() => { setVisible(true) }}>
        {props.icon}
      </div>
      {visible && <AppButtonContent name={props.name} content={props.content} closeAction={() => setVisible(false)} />}
    </>
  )
}

const AppButtonContent = (props) => {
  const name = props.name
  const closeAction = props.closeAction
  const content = props.content

  return (
    <>
      <div className={name}>
        <div className='container-fluid'>
          <div className='row px-2 py-3'>
            <div className='col my-auto'>
              <div className='window-heading'>{name.toUpperCase()}</div>
            </div>
            <div className='col-auto my-auto'>
              <div className='close-icon-container shadow-lg' onClick={closeAction}>
                {CloseIcon({ width: '30px', height: '30px' })}
              </div>
            </div>
          </div>
          {content(closeAction)}
        </div>
      </div>
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

export let toggleLoadingVisibility

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    toggleLoadingVisibility = (visible) => setVisible(visible)
  }, [])

  return (
    <>
      {visible &&
        <div className='w-100 h-100 loading-screen'>

        </div>}
    </>
  )
}

export default App
