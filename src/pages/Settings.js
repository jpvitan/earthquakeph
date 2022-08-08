/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { toggleLoadingVisibility } from '../App'
import { earthquake, fetchData } from '../api/DataHandler'
import { getMagnitudeArrayBounds } from '../utility/Utility'

const Settings = (closeAction) => {
  const [minMagnitudeArray, maxMagnitudeArray] = getMagnitudeArrayBounds(earthquake.minMagnitude, earthquake.maxMagnitude)

  const updateMagnitudeBounds = () => {
    const minMagnitudeSelect = document.getElementById('min_magnitude')
    const maxMagnitudeSelect = document.getElementById('max_magnitude')

    const minMagnitude = parseInt(minMagnitudeSelect.value)
    const maxMagnitude = parseInt(maxMagnitudeSelect.value)

    const [minMagnitudeArray, maxMagnitudeArray] = getMagnitudeArrayBounds(minMagnitude, maxMagnitude)

    minMagnitudeSelect.innerHTML = ''
    maxMagnitudeSelect.innerHTML = ''

    minMagnitudeArray.forEach(value => {
      const option = document.createElement('option')
      option.key = value
      option.value = value
      option.innerHTML = value
      minMagnitudeSelect.appendChild(option)
    })
    maxMagnitudeArray.forEach(value => {
      const option = document.createElement('option')
      option.key = value
      option.value = value
      option.innerHTML = value
      maxMagnitudeSelect.appendChild(option)
    })

    minMagnitudeSelect.value = minMagnitude
    maxMagnitudeSelect.value = maxMagnitude
  }

  const minMagnitudeInitialOptions = []
  const maxMagnitudeInitialOptions = []
  minMagnitudeArray.forEach((value) => {
    minMagnitudeInitialOptions.push({ value, display: value })
  })
  maxMagnitudeArray.forEach((value) => {
    maxMagnitudeInitialOptions.push({ value, display: value })
  })

  const saveAction = () => {
    const minMagnitude = parseInt(document.getElementById('min_magnitude').value)
    const maxMagnitude = parseInt(document.getElementById('max_magnitude').value)
    const plot = parseInt(document.getElementById('plot').value)
    const theme = document.getElementById('theme').value
    const squareAreaValue = document.getElementById('location').value

    earthquake.minMagnitude = minMagnitude
    earthquake.maxMagnitude = maxMagnitude
    earthquake.plot = plot
    earthquake.theme = theme
    earthquake.squareAreaValue = squareAreaValue

    toggleLoadingVisibility(true)
    fetchData(false)
    closeAction()
  }

  return (
    <>
      <div className='row justify-content-center px-2'>
        <div className='col col-limiter'>
          <div className='row'>
            <SettingsComponent id='min_magnitude' label='Minimum Magnitude' defaultValue={earthquake.minMagnitude} onChange={updateMagnitudeBounds} options={minMagnitudeInitialOptions} />
            <SettingsComponent id='max_magnitude' label='Maximum Magnitude' defaultValue={earthquake.maxMagnitude} onChange={updateMagnitudeBounds} options={maxMagnitudeInitialOptions} />
          </div>
        </div>
      </div>
      <div className='row justify-content-center px-2'>
        <div className='col col-limiter'>
          <div className='row'>
            <SettingsComponent id='plot' label='Plot' defaultValue={earthquake.plot} onChange={() => { }} options={[{ value: 5, display: '5' }, { value: 10, display: '10' }, { value: 15, display: '15' }, { value: 20, display: '20' }, { value: 25, display: '25' }, { value: 30, display: '30' }]} />
            <SettingsComponent id='theme' label='Theme' defaultValue={earthquake.theme} onChange={() => { }} options={[{ value: 'mapbox://styles/jpvitan/ckwjznqa44qhz14qnswqs0koo', display: 'Dark' }, { value: 'mapbox://styles/darkaxe201/ckhupcwep3gh31apgealmhkdc', display: 'Light' }, { value: 'mapbox://styles/darkaxe201/ckhuud56s00xw1as9bnzdupdw', display: 'Terrain' }]} />
          </div>
        </div>
      </div>
      <div className='row justify-content-center px-2'>
        <div className='col col-limiter'>
          <div className='row'>
            <SettingsComponent id='location' label='Location' defaultValue={earthquake.squareAreaValue} onChange={() => { }} options={[{ value: 0, display: 'Philippines' }, { value: 1, display: 'All' }]} />
            <SettingsComponent id='update_interval' label='Update Interval' defaultValue={earthquake.squareAreaValue} onChange={() => { }} options={[{ value: 30, display: '30 seconds' }, { value: 60, display: '60 seconds' }, { value: 90, display: '90 seconds' }, { value: 120, display: '120 seconds' }, { value: 150, display: '150 seconds' }, { value: 180, display: '180 seconds' }]} />
          </div>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-auto'>
          <div data-testid='save_button' className='btn my-5 px-5 py-2 shadow-lg save-button' onClick={saveAction}>Save</div>
        </div>
      </div>
    </>
  )
}

const SettingsComponent = (props) => {
  return (
    <>
      <div className='col-sm-6 mt-4'>
        <div className='label mb-2'>{props.label}</div>
        <select id={props.id} data-testid={props.id} className='form-select' defaultValue={props.defaultValue} onChange={props.onChange}>
          {props.options.map((data) => { return <option key={data.value} value={data.value}>{data.display}</option> })}
        </select>
      </div>
    </>
  )
}

export default Settings
