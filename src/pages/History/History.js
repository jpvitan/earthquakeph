/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Utility from '../../utility/Utility'
import './History.scss'

const History = ({ onClose, earthquake }) => {
  return (
    <div className='history'>
      <div className='container-fluid px-0'>
        {earthquake.list.map((earthquake) => <Unit key={earthquake.id} {...earthquake} onClose={onClose} />)}
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
      <div className='col-auto my-auto text-center'>
        <h1 style={{ fontWeight: 'bold', color: Utility.magnitude.getColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
        <p className='depth-paragraph badge bg-warning mb-0'>{depth + ' km'}</p>
      </div>
      <div className='col my-auto'>
        <p className='location-paragraph mb-0'>{location}</p>
        <p className='time-paragraph mb-0'>{new Date(time).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default History
