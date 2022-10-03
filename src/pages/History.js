/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { earthquake, cycle } from '../api/DataHandler'
import { getMagnitudeColor } from '../utility/Utility'

const History = (closeAction) => {
  return (
    <>
      {cycle.noData ? <NoDataNotice /> : <EarthquakeList />}
    </>
  )
}

const EarthquakeList = () => {
  return (
    <>
      <div id='history_container'>
        {
          earthquake.list.map((earthquake) => {
            return (
              <div className='row px-2 pb-5' key={earthquake.id}>
                <div className='col-auto my-auto text-center'>
                  <h1 style={{ fontWeight: 'bold', color: getMagnitudeColor(earthquake.magnitude) }}>{earthquake.magnitude.toFixed(1)}</h1>
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
    </>
  )
}

const NoDataNotice = () => {
  return (
    <>
      <div className='row justify-content-center px-2 pb-5'>
        <div className='col-auto text-center'>
          <p className='location-paragraph mb-0'>No Available Data</p>
        </div>
      </div>
    </>
  )
}

export default History
