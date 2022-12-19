/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Utility from '../../utility/Utility'
import './History.scss'

const History = (onClose, earthquake) => {
  return (
    <div className='history'>
      {
        earthquake.list.map((earthquake) => {
          const { id, longitude, latitude, magnitude, depth, location, time } = earthquake

          const handleOnClick = () => {
            Utility.map.setCoordinates(longitude, latitude, 10)
            onClose()
          }

          return (
            <div className='row px-2 pb-5' key={id}>
              <div
                className='col-auto my-auto text-center' style={{ cursor: 'pointer' }} onClick={handleOnClick}
              >
                <h1 style={{ fontWeight: 'bold', color: Utility.getMagnitudeColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
                <p className='depth-paragraph badge bg-warning mb-0'>{depth + ' km'}</p>
              </div>
              <div className='col my-auto'>
                <p className='location-paragraph mb-0'>{location}</p>
                <p className='time-paragraph mb-0'>{new Date(time).toLocaleString()}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default History
