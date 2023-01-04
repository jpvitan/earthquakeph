/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Notice from '../../components/Notice/Notice'
import Icon from '../../utility/Icon'
import Utility from '../../utility/Utility'
import LocationData from '../../data/Location'
import './Location.scss'

const Location = ({ onClose, earthquake }) => {
  return (
    <div className='location'>
      <div className='container-fluid px-0'>
        <PreContent />
        {LocationData.map((location) => <Unit key={location.code} {...location} onClose={onClose} />)}
      </div>
    </div>
  )
}

const PreContent = () => {
  return (
    <div className='row mb-2'>
      <div className='col'>
        <Notice data={[
          { id: 1, icon: Icon.About(), message: 'You might see some results from adjacent or neighboring countries due to overlapping bounding boxes. This behavior is normal and expected.' },
          { id: 2, icon: Icon.PatchCheck({ color: '#2ecc71' }), message: 'Results may be less accurate for countries without a verified bounding box.' }
        ]}
        />
      </div>
    </div>
  )
}

const Unit = ({ name, code, verified, onClose }) => {
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
      <div className='col-auto my-auto'>
        <p className='name-paragraph mb-0'>{name}</p>
      </div>
      <div className='col-auto my-auto px-0'>
        {verified && Icon.PatchCheck({ display: 'block', width: '15px', height: '15px', color: '#2ecc71' })}
      </div>
    </div>
  )
}

export default Location
