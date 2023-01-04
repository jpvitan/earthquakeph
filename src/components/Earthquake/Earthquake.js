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
import { useState, useEffect } from 'react'
import './Earthquake.scss'
import warningSign from '../../assets/img/warning.png'

const Earthquake = ({ earthquake }) => {
  return (
    <div className='earthquake'>
      <div className='container-fluid px-0'>
        <div className='row'>
          <div className='col'>
            <InformationCard {...earthquake} />
          </div>
        </div>
      </div>
    </div>
  )
}

const InformationCard = ({ longitude, latitude, location, depth, magnitude }) => {
  const handleOnClick = () => Utility.map.setCoordinates(longitude, latitude, Utility.configuration.zoom)

  return (
    <div className='information-card shadow-lg text-light' onClick={handleOnClick}>
      <div className='container-fluid px-4 py-4'>
        <div className='row mb-2'>
          <div className='col-auto'>
            <h1 className='my-0' style={{ fontWeight: 'bold', color: Utility.magnitude.getColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
          </div>
          <div className='col-auto my-auto px-0'>
            {magnitude >= 6 && <img className='warning-sign' src={warningSign} alt='Warning Sign' width={35} height={35} />}
          </div>
        </div>
        <div className='row'>
          <div className='col-auto pe-0'>
            {Icon.Down({ width: 18, height: 18 })}
          </div>
          <div className='col-auto ps-2'>
            <p className='mb-0'>{depth + ' km'}</p>
          </div>
          <div className='col-auto my-auto px-0'>
            <FetchIndicator />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='mb-0'>{location}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-auto'>
            <MagnitudeScale />
          </div>
          <div className='col-auto'>
            <LocationIndicator />
          </div>
        </div>
      </div>
    </div>
  )
}

const FetchIndicator = () => {
  const [color, setColor] = useState('#2ecc71')

  useEffect(() => {
    Utility.display.setIndicatorColor = (color) => setColor(color)
  }, [])

  return (
    <div className='fetch-indicator shadow-lg' style={{ backgroundColor: color }} />
  )
}

const MagnitudeScale = () => {
  return (
    <div className='magnitude-scale'>
      <div className='container-fluid px-0'>
        <div className='row'>
          <ScaleUnit value={3} color={Utility.magnitude.getColor(3)} text='3-' />
          <ScaleUnit value={4} color={Utility.magnitude.getColor(4)} text='4' />
          <ScaleUnit value={5} color={Utility.magnitude.getColor(5)} text='5' />
          <ScaleUnit value={6} color={Utility.magnitude.getColor(6)} text='6' />
          <ScaleUnit value={7} color={Utility.magnitude.getColor(7)} text='7' />
          <ScaleUnit value={8} color={Utility.magnitude.getColor(8)} text='8+' />
        </div>
      </div>
    </div>
  )
}

const ScaleUnit = ({ value, color, text }) => {
  const handleOnClick = () => {
    Utility.configuration.minMagnitude = value
    Utility.dataCycle.update()
  }

  return (
    <div className='col-auto pe-1 mt-2'>
      <div className='scale-unit' style={{ backgroundColor: color }} onClick={handleOnClick}>
        <p>{text}</p>
      </div>
    </div>
  )
}

const LocationIndicator = () => {
  return (
    <div className='location-indicator shadow-lg mt-2'>
      <p>{Utility.configuration.getLocation().code}</p>
    </div>
  )
}

export default Earthquake
