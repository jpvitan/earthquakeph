/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { Value, Slider, Switch, Drop } from '../components/Form'
import { useState } from 'react'

const Settings = ({ configuration, engine, earthquake, onClose }) => {
  return (
    <div className='settings'>
      <Form configuration={configuration} engine={engine} onClose={onClose} />
    </div>
  )
}

const Form = ({ configuration, engine, onClose }) => {
  const [plot, setPlot] = useState(configuration.plot)
  const [interval, setInterval] = useState(configuration.interval)
  const [appTheme, setAppTheme] = useState(configuration.appTheme)
  const [mapTheme, setMapTheme] = useState(configuration.mapTheme)
  const [zoom, setZoom] = useState(((configuration.zoom - 3) / 19 * 100).toFixed(0))
  const [showBoundingBox, setShowBoundingBox] = useState(configuration.showBoundingBox)

  const submit = (e) => {
    e.preventDefault()

    configuration.plot = plot
    configuration.interval = interval
    configuration.appTheme = appTheme
    configuration.mapTheme = mapTheme
    configuration.zoom = 3 + (19 * (zoom / 100))
    configuration.showBoundingBox = showBoundingBox

    if (configuration.toggleLoading) configuration.toggleLoading(true)

    engine.update()

    onClose()
  }

  return (
    <form onSubmit={submit}>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Engine</p>
            <div className='board board-color-blue card border-0 shadow-lg px-3 py-3'>
              <Value label='Location' value={configuration.location} />
              <hr />
              <Value label='Minimum Magnitude' value={configuration.minMagnitude} />
              <hr />
              <Value label='Maximum Magnitude' value={configuration.maxMagnitude} />
              <hr />
              <Slider label='Plot' value={plot} min={10} max={100} step={10} onChange={(e) => setPlot(e.target.value)} indicator={`${plot} earthquakes`} />
              <hr />
              <Slider label='Interval' value={interval} min={30} max={300} step={30} onChange={(e) => setInterval(e.target.value)} indicator={`${interval} seconds`} />
            </div>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Map</p>
            <div className='board board-color-blue card border-0 shadow-lg px-3 py-3'>
              <Slider label='Zoom' value={zoom} min={0} max={100} step={1} onChange={(e) => setZoom(e.target.value)} indicator={`${zoom}%`} />
              <hr />
              <Switch label='Bounding Box' checked={showBoundingBox} onChange={() => setShowBoundingBox(!showBoundingBox)} />
              <hr />
              <Drop label='Theme' value={mapTheme} option={[{ value: 'Dark', text: 'Dark' }, { value: 'Light', text: 'Light' }, { value: 'Terrain', text: 'Terrain' }]} onChange={(e) => { setMapTheme(e.target.value) }} />
            </div>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>App</p>
            <div className='board board-color-blue card border-0 shadow-lg px-3 py-3'>
              <Drop label='Theme' value={appTheme} option={[{ value: 'Black Pearl', text: 'Black Pearl' }, { value: 'Deep Black', text: 'Deep Black' }, { value: 'Shadowed Steel', text: 'Shadowed Steel' }, { value: 'Total Eclipse', text: 'Total Eclipse' }]} onChange={(e) => { setAppTheme(e.target.value) }} />
              <hr />
              <Value label='Version' value='4.0.0' />
              <hr />
              <Value label='Developer' value='Justine Paul Vitan' />
              <hr />
              <Copyright year={2022} />
            </div>
          </section>
          <section className='my-5'>
            <div className='container-fluid px-0'>
              <div className='row justify-content-center g-0'>
                <div className='col-auto'>
                  <button className='button button-color-orange btn shadow-lg mt-3 px-4 py-2'>Save and Exit</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  )
}

const Copyright = ({ year }) => {
  return (
    <div className='form-value container-fluid px-0'>
      <div className='row g-0'>
        <div className='col text-center'>
          <p className='text-size-xs text-color-gray fw-bold mb-0'>Developed and Designed by Justine Paul Vitan.</p>
          <p className='text-size-xs text-color-gray fw-bold mb-0'>Copyright © {year} Justine Paul Vitan. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
