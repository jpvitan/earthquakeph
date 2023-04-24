/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Data from '../utilities/Data'
import Icon from '../utilities/Icon'

const Location = ({ configuration, engine, earthquake, onClose }) => {
  const update = (location) => {
    configuration.engine.location = location.name
    if (configuration.app.toggleLoading) configuration.app.toggleLoading(true)
    engine.update({ forced: false, recycle: true })
    onClose()
  }

  return (
    <div className='location'>
      <div className='row mt-3 mb-5'>
        <div className='col-auto my-auto'>
          {Icon.Globe({ display: 'block', width: 20, height: 20, color: '#fff' })}
        </div>
        <div className='col my-auto'>
          <p className='mb-0'>You might see some results from adjacent or neighboring countries due to overlapping bounding boxes. This behavior is normal and expected.</p>
        </div>
      </div>
      {Data.Location.map((location) => <Unit key={location.code} location={location} onClick={() => { update(location) }} />)}
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
