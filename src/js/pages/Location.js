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
import Data from '../utilities/Data'
import Icon from '../utilities/Icon'
import { useState } from 'react'

const Location = ({ configuration, engine, earthquake, onClose }) => {
  const [search, setSearch] = useState('')

  const update = (location) => {
    configuration.engine.location = location.name
    if (configuration.app.toggleLoading) configuration.app.toggleLoading(true)
    engine.update({ forced: false, recycle: true })
    onClose()
  }

  return (
    <div className='location'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-4'>
            <p className='text-size-sm'>You might see some results from adjacent or neighboring countries due to overlapping bounding boxes. This behavior is normal and expected.</p>
            <Field label={Icon.Search({ width: 15, height: 15, color: '#999' })} placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
          </section>
          <section className='mt-4'>
            {Data.Location.filter((location) => location.name.toLowerCase().includes(search.toLowerCase())).map((location) => <Unit key={location.code} location={location} onClick={() => { update(location) }} />)}
          </section>
        </div>
      </div>
    </div>
  )
}

const Unit = ({ location, onClick }) => {
  const { name, code, verified } = location

  return (
    <div className='unit row mb-5' onClick={onClick}>
      <div className='col-auto my-auto'>
        <div className='button-location d-flex justify-content-center align-items-center'>
          <p className='text-size-md fw-bold mb-0'>{code}</p>
        </div>
      </div>
      <div className='col my-auto'>
        <p className='text-size-md fw-bold mb-0'>{name}</p>
        {verified && <p className='text-size-sm text-color-green fw-bold mb-0'>Verified</p>}
      </div>
    </div>
  )
}

export default Location
