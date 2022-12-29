/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import LocationData from '../../data/Location'
import './Location.scss'

const Location = ({ onClose, earthquake }) => {
  return (
    <div className='location'>
      <div className='container-fluid px-0'>
        {
          LocationData.map((location) => {
            const { name, area, code } = location

            const handleOnClick = () => {
              onClose()
            }

            return (
              <div key={code} className='row mb-5' style={{ cursor: 'pointer' }} onClick={handleOnClick}>
                <div className='col-auto my-auto'>
                  <div className='code-circle'>
                    <p>{code}</p>
                  </div>
                </div>
                <div className='col my-auto'>
                  <p className='name-paragraph mb-0'>{name}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Location
