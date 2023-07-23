/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { BoardStack } from '../components/Board'
import { ButtonPill } from '../components/Button'
import { Value, Slider, Switch, Drop, Link } from '../components/Form'
import Data from '../utilities/Data'
import { useState } from 'react'

const option = {
  app: {
    theme: [
      { value: 'Black Pearl', text: 'Black Pearl' },
      { value: 'Deep Black', text: 'Deep Black' },
      { value: 'Shadowed Steel', text: 'Shadowed Steel' },
      { value: 'Total Eclipse', text: 'Total Eclipse' }
    ]
  },
  map: {
    theme: [
      { value: 'Dark', text: 'Dark' },
      { value: 'Light', text: 'Light' },
      { value: 'Terrain', text: 'Terrain' }
    ]
  }
}

const Settings = ({ configuration, engine, earthquake, onClose }) => {
  const [appTheme, setAppTheme] = useState(configuration.app.theme.name)
  const [minMagnitude, setMinMagnitude] = useState(configuration.engine.minMagnitude)
  const [maxMagnitude, setMaxMagnitude] = useState(configuration.engine.maxMagnitude)
  const [plot, setPlot] = useState(configuration.engine.plot)
  const [interval, setInterval] = useState(configuration.engine.interval)
  const [pause, setPause] = useState(configuration.engine.pause)
  const [mapTheme, setMapTheme] = useState(configuration.map.theme.name)
  const [zoom, setZoom] = useState(((configuration.map.zoom - 3) / 19 * 100).toFixed(0))
  const [showBoundingBox, setShowBoundingBox] = useState(configuration.map.showBoundingBox)

  const callback = (earthquake) => {
    if (earthquake.list.length === 0) {
      configuration.app.toggleMessage({
        icon: 'error',
        title: 'No Results Found',
        message: 'There are no available results for your current configuration. Please check your settings and try again.',
        onClose: () => { configuration.app.toggleMessage(null) }
      })
    } else {
      configuration.app.toggleMessage({
        icon: 'success',
        title: 'Settings Updated',
        message: 'Your settings have been updated to match your desired preferences.',
        onClose: () => { configuration.app.toggleMessage(null) }
      })
    }
  }

  const submit = (e) => {
    e.preventDefault()

    configuration.app.theme = Data.AppTheme.find((theme) => theme.name === appTheme)
    configuration.engine.minMagnitude = minMagnitude
    configuration.engine.maxMagnitude = maxMagnitude
    configuration.engine.plot = plot
    configuration.engine.interval = interval
    configuration.engine.pause = pause
    configuration.map.theme = Data.MapTheme.find((theme) => theme.name === mapTheme)
    configuration.map.zoom = 3 + (19 * (zoom / 100))
    configuration.map.showBoundingBox = showBoundingBox

    const { className, color } = configuration.app.theme
    const app = document.getElementById('app')
    const element = document.querySelector('meta[name="theme-color"]')
    if (app) app.className = className
    if (element) element.setAttribute('content', color)

    configuration.app.toggleLoading(true)

    engine.update({
      forced: true,
      recycle: true,
      callback
    })
  }

  return (
    <div className='settings'>
      <form onSubmit={submit}>
        <div className='row justify-content-center'>
          <div className='content-xs col'>
            <section className='mt-5'>
              <p className='text-size-md fw-bold'>App</p>
              <BoardStack>
                <Drop
                  label='Theme'
                  value={appTheme}
                  option={option.app.theme}
                  onChange={(e) => { setAppTheme(e.target.value) }}
                />
              </BoardStack>
            </section>
            <section className='mt-5'>
              <p className='text-size-md fw-bold'>Engine</p>
              <BoardStack>
                <Slider
                  label='Minimum Magnitude'
                  value={minMagnitude}
                  min={1}
                  max={maxMagnitude - 1}
                  step={1}
                  onChange={(e) => setMinMagnitude(Number(e.target.value))}
                  indicator={`${minMagnitude}`}
                />
                <hr />
                <Slider
                  label='Maximum Magnitude'
                  value={maxMagnitude}
                  min={minMagnitude + 1}
                  max={10}
                  step={1}
                  onChange={(e) => setMaxMagnitude(Number(e.target.value))}
                  indicator={`${maxMagnitude}`}
                />
                <hr />
                <Slider
                  label='Plot'
                  value={plot}
                  min={10}
                  max={100}
                  step={10}
                  onChange={(e) => setPlot(Number(e.target.value))}
                  indicator={`${plot} earthquakes`}
                />
                <hr />
                <Slider
                  label='Interval'
                  value={interval}
                  min={30}
                  max={300}
                  step={30}
                  onChange={(e) => setInterval(Number(e.target.value))}
                  indicator={`${interval} seconds`}
                />
                <hr />
                <Switch
                  label='Pause'
                  checked={pause}
                  onChange={() => setPause(!pause)}
                />
              </BoardStack>
            </section>
            <section className='mt-5'>
              <p className='text-size-md fw-bold'>Map</p>
              <BoardStack>
                <Drop
                  label='Theme'
                  value={mapTheme}
                  option={option.map.theme}
                  onChange={(e) => { setMapTheme(e.target.value) }}
                />
                <hr />
                <Slider
                  label='Zoom'
                  value={zoom}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(e) => setZoom(Number(e.target.value))} indicator={`${zoom}%`}
                />
                <hr />
                <Switch
                  label='Bounding Box'
                  checked={showBoundingBox}
                  onChange={() => setShowBoundingBox(!showBoundingBox)}
                />
              </BoardStack>
            </section>
            <section className='mt-5'>
              <p className='text-size-md fw-bold'>Links</p>
              <BoardStack>
                <Link
                  label='License Information'
                  link='https://github.com/jpvitan/earthquakeph/blob/master/LICENSE'
                />
                <hr />
                <Link
                  label="Developer's Website"
                  link='https://jpvitan.com/'
                />
              </BoardStack>
            </section>
            <section className='mt-5'>
              <p className='text-size-md fw-bold'>System</p>
              <BoardStack>
                <Value
                  label='Version'
                  value='5.0.0'
                />
              </BoardStack>
            </section>
            <section className='mt-5'>
              <BoardStack>
                <Copyright year={2022} />
              </BoardStack>
            </section>
            <section className='my-5'>
              <div className='container-fluid px-0'>
                <div className='row justify-content-center g-0'>
                  <div className='col-auto'>
                    <ButtonPill>Save</ButtonPill>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  )
}

const Copyright = ({ year }) => {
  return (
    <div className='form-value container-fluid px-0'>
      <div className='row g-0'>
        <div className='col text-center'>
          <img className='shadow-lg mb-2' alt='EarthquakePH' src='apple-touch-icon.png' width={20} height={20} />
          <p className='text-size-xs text-color-gray fw-bold'>EarthquakePH is a highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.</p>
          <p className='text-size-xs text-color-gray fw-bold'>Built by Justine Paul Vitan as a solo project to demonstrate his capabilities in developing rich and scalable web applications. The source code of this project is open and available to the public via GitHub for transparency and open-source collaboration.</p>
          <p className='text-size-xs text-color-gray fw-bold mb-0'>Developed and Designed by Justine Paul Vitan.</p>
          <p className='text-size-xs text-color-gray fw-bold mb-0'>Copyright © {year} Justine Paul Vitan. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
