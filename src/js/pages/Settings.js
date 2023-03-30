/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { Slider } from '../components/Form'
import { useState } from 'react'

const Settings = ({ configuration, engine, earthquake, onClose }) => {
  return (
    <div className='settings'>
      <Form configuration={configuration} engine={engine} onClose={onClose} />
    </div>
  )
}

const Form = ({ configuration, engine, onClose }) => {
  const [interval, setInterval] = useState(configuration.interval)
  const [zoom, setZoom] = useState(((configuration.zoom - 3) / 19 * 100).toFixed(0))
  const [showBoundingBox, setShowBoundingBox] = useState(configuration.showBoundingBox)
  const [plot, setPlot] = useState(configuration.plot)

  const submit = (e) => {
    e.preventDefault()
    if (configuration.toggleLoading) configuration.toggleLoading(true)
    configuration.interval = interval
    configuration.zoom = 3 + (19 * (zoom / 100))
    configuration.showBoundingBox = showBoundingBox
    configuration.plot = plot
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
              <Slider label='Interval' value={interval} min={30} max={300} step={30} onChange={(e) => setInterval(e.target.value)} indicator={`${interval} seconds`} />
            </div>
          </section>
        </div>
      </div>
    </form>
  )
}

export default Settings
