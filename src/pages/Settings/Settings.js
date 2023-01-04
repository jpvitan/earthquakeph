/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { Value, Switch, Slider } from '../../components/Form/Form'
import Utility from '../../utility/Utility'
import { useState } from 'react'
import './Settings.scss'

const Settings = ({ onClose, earthquake }) => {
  return (
    <div className='settings'>
      <Form onClose={onClose} />
    </div>
  )
}

const Form = ({ onClose }) => {
  const [interval, setInterval] = useState(Utility.configuration.interval)
  const [zoom, setZoom] = useState(((Utility.configuration.zoom - 3) / 19 * 100).toFixed(0))
  const [showBoundingBox, setShowBoundingBox] = useState(Utility.configuration.showBoundingBox)
  const [plot, setPlot] = useState(Utility.configuration.plot)

  const handleSubmit = (e) => {
    e.preventDefault()
    Utility.configuration.interval = interval
    Utility.configuration.zoom = 3 + (19 * (zoom / 100))
    Utility.configuration.showBoundingBox = showBoundingBox
    Utility.configuration.plot = plot
    Utility.dataCycle.update(true)
    Utility.display.toggleLoadingVisibility(true)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container-fluid px-0'>
        <div className='row justify-content-center'>
          <div className='control col'>
            <section>
              <h2 className='ms-2 mb-2'>Update</h2>
              <div className='card border-0 shadow-lg px-3 py-3 mb-5'>
                <div className='container-fluid px-0'>
                  <Slider label='Interval' value={interval} min={30} max={300} step={30} onChange={(e) => setInterval(e.target.value)} indicator={`${interval} seconds`} />
                </div>
              </div>
            </section>
            <section>
              <h2 className='ms-2 mb-2'>Map</h2>
              <div className='card border-0 shadow-lg px-3 py-3 mb-5'>
                <div className='container-fluid px-0'>
                  <Slider label='Zoom' value={zoom} min={0} max={100} step={1} onChange={(e) => setZoom(e.target.value)} indicator={`${zoom}%`} separator />
                  <Switch label='Bounding Box' checked={showBoundingBox} onChange={() => setShowBoundingBox(!showBoundingBox)} separator />
                  <Value label='Theme' value={Utility.configuration.mapTheme} />
                </div>
              </div>
            </section>
            <section>
              <h2 className='ms-2 mb-2'>Earthquake</h2>
              <div className='card border-0 shadow-lg px-3 py-3 mb-5'>
                <div className='container-fluid px-0'>
                  <Slider label='Plot' value={plot} min={10} max={100} step={10} onChange={(e) => setPlot(e.target.value)} indicator={`${plot} earthquakes`} separator />
                  <Value label='Location' value={Utility.configuration.location} separator />
                  <Value label='Minimum Magnitude' value={Utility.configuration.minMagnitude} separator />
                  <Value label='Maximum Magnitude' value={Utility.configuration.maxMagnitude} />
                </div>
              </div>
            </section>
            <div className='container-fluid px-0 mb-5'>
              <div className='row justify-content-center'>
                <div className='col-auto'>
                  <button className='btn px-5 py-2'>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Settings
