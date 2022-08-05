/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Map from './components/Map'
import Earthquake from './components/Earthquake'
import About from './pages/About'
import History from './pages/History'
import Settings from './pages/Settings'
import { SettingsIcon, AboutIcon, HistoryIcon, CloseIcon } from './assets/img/svg/Icon'
import { useEffect, useState } from 'react'
import './App.css'
import './pages/Pages.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <>
      <Map />
      <Earthquake />
      <AppButtonContainer />
      <LoadingScreen />
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

export let toggleLoadingVisibility = () => { }

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    toggleLoadingVisibility = (visible) => setVisible(visible)
  }, [])

  return (
    <>
      {visible &&
        <div className='w-100 h-100 loading-screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center text-light'>
                <img className='img-fluid shadow mb-4' alt='earthquakeph' src='apple-touch-icon.png' width={70} height={70} />
                <div id='spinner_container' className='d-flex justify-content-center mb-5'>
                  <div className='spinner-border text-danger' role='status' />
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default App
