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
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-4'>
            <p className='text-size-sm'>You might see some results from adjacent or neighboring countries due to overlapping bounding boxes. This behavior is normal and expected.</p>
            <Field label={Icon.Search({ width: 15, height: 15, color: '#999' })} placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
          </section>
          <section className='mt-4'>
            {earthquake.list.filter((earthquake) => earthquake.location.toLowerCase().includes(search.toLowerCase())).map((earthquake) => <Unit key={earthquake.id} earthquake={earthquake} onClick={() => { focus(earthquake) }} />)}
          </section>
        </div>
      </div>
    </div>
  )
}

const Unit = ({ earthquake, onClick }) => {
  const { magnitude, color, depth, time, location } = earthquake
  const date = new Date(time)

  return (
    <div className='unit row mb-4'>
      <div className='col'>
        <div className='board board-color-black card border-0 shadow-lg px-4 py-4' onClick={onClick}>
          <div className='row g-0'>
            <div className='col-auto my-auto'>
              <p className='text-size-md fw-bold mb-0' style={{ color }}>{`${magnitude.toFixed(1)}`}</p>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col-auto my-auto pe-1'>
              {Icon.Down({ display: 'block', width: 10, height: 10, color: '#fff' })}
            </div>
            <div className='col-auto my-auto pe-1'>
              <p className='text-size-sm fw-bold mb-0'>{`${depth} km`}</p>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col my-auto'>
              <p className='text-size-sm fw-bold mb-0'>{`${date.toDateString()} ${date.toLocaleTimeString('en-US', { hour12: false })}`}</p>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col my-auto'>
              <p className='text-size-sm fw-bold mb-0'>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
