/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Utility from '../utility/Utility'

const History = (onClose, globalProperties) => {
  const { earthquake } = globalProperties

  return (
    <div id='history_container'>
      {
        earthquake.list.map((earthquake) => {
          return (
            <div className='row px-2 pb-5' key={earthquake.id}>
              <div
                className='col-auto my-auto text-center' style={{ cursor: 'pointer' }} onClick={() => {
                  onClose()
                }}
              >
                <h1 style={{ fontWeight: 'bold', color: Utility.getMagnitudeColor(earthquake.magnitude) }}>{earthquake.magnitude.toFixed(1)}</h1>
                <p className='depth-paragraph badge bg-warning mb-0'>{earthquake.depth + ' km'}</p>
              </div>
              <div className='col my-auto'>
                <p className='location-paragraph mb-0'>{earthquake.location}</p>
                <p className='time-paragraph mb-0'>{new Date(earthquake.time).toLocaleString()}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default History
