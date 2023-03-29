/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

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
    <form onSubmit={submit} />
  )
}

export default Settings
