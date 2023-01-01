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
import LocationData from '../../data/Location'
import './Location.scss'

const Location = ({ onClose, earthquake }) => {
  return (
    <div className='location'>
      <div className='container-fluid px-0'>
        <Notice />
        {LocationData.map((location) => <Unit key={location.code} {...location} onClose={onClose} />)}
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
        <div className='code-circle shadow-lg'>
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
