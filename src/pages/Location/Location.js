/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Utility from '../../utility/Utility'
import LocationData from '../../data/Location'
import './Location.scss'

const Location = ({ onClose, earthquake }) => {
  return (
    <div className='location'>
      <div className='container-fluid px-0'>
        {LocationData.map((location) => <Unit key={location.code} {...location} onClose={onClose} />)}
      </div>
    </div>
  )
}

const Unit = ({ name, code, onClose }) => {
  const handleOnClick = () => {
    onClose()
    Utility.display.toggleLoadingVisibility(true)
    Utility.configuration.location = name
    Utility.dataCycle.update()
  }

  return (
    <div className='unit row mb-5' onClick={handleOnClick}>
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
}

export default Location
