/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Icon from '../../utility/Icon'
import Utility from '../../utility/Utility'
import './History.scss'

const History = ({ onClose, earthquake }) => {
  return (
    <div className='history'>
      <div className='container-fluid px-0'>
        <Notice />
        {earthquake.list.map((earthquake) => <Unit key={earthquake.id} {...earthquake} onClose={onClose} />)}
      </div>
    </div>
  )
}

const Notice = () => {
  return (
    <div className='notice row mb-5'>
      <div className='col-auto my-auto'>
        {Icon.About()}
      </div>
      <div className='col my-auto'>
        <p className='mb-0'>You might see some results from adjacent or neighboring countries due to overlapping bounding boxes. This behavior is normal and expected.</p>
      </div>
    </div>
  )
}

const Unit = ({ id, longitude, latitude, magnitude, depth, location, time, onClose }) => {
  const handleOnClick = () => {
    Utility.map.setCoordinates(longitude, latitude, 10)
    onClose()
  }

  return (
    <div className='unit row mb-5' onClick={handleOnClick}>
      <div className='col-auto my-auto'>
        <div className='magnitude-square shadow-lg' style={{ backgroundColor: Utility.magnitude.getColor(magnitude) }}>
          <p>{magnitude.toFixed(1)}</p>
        </div>
      </div>
      <div className='col my-auto'>
        <p className='location-paragraph mb-0'>{location}</p>
        <p className='time-paragraph mb-0'>{new Date(time).toLocaleString('en-US', { hour12: false })}</p>
      </div>
    </div>
  )
}

export default History
