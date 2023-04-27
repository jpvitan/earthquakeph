/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { Field } from '../components/Form'
import Icon from '../utilities/Icon'
import { useState } from 'react'

const History = ({ configuration, engine, earthquake, onClose }) => {
  const [search, setSearch] = useState('')

  const focus = (earthquake) => {
    if (configuration.app.map) configuration.app.map.flyTo({ center: [earthquake.longitude, earthquake.latitude], zoom: 12 })
    onClose()
  }

  return (
    <div className='history'>
      <div className='row mt-3'>
        <div className='col my-auto'>
          <Field label={Icon.Search({ width: 15, height: 15, color: '#999' })} placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
        </div>
      </div>
      <div className='row mt-3 mb-4'>
        <div className='col my-auto'>
          <p className='text-size-sm mb-0'>You might see some results from adjacent or neighboring countries due to overlapping bounding boxes. This behavior is normal and expected.</p>
        </div>
      </div>
      {earthquake.list.map((earthquake) => <Unit key={earthquake.id} earthquake={earthquake} onClick={() => { focus(earthquake) }} />)}
    </div>
  )
}

const Unit = ({ earthquake, onClick }) => {
  const { magnitude, location, time, color } = earthquake

  return (
    <div className='unit row mb-5' onClick={onClick}>
      <div className='col-auto my-auto'>
        <div className='button-magnitude d-flex justify-content-center align-items-center' style={{ backgroundColor: color }}>
          <p className='text-size-md fw-bold mb-0'>{`${magnitude.toFixed(1)}`}</p>
        </div>
      </div>
      <div className='col my-auto'>
        <p className='text-size-md fw-bold mb-0'>{location}</p>
        <p className='text-size-sm text-color-green fw-bold mb-0'>{new Date(time).toLocaleString('en-US', { hour12: false })}</p>
      </div>
    </div>
  )
}

export default History
