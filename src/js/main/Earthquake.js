/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Icon from '../utilities/Icon'
import Image from '../utilities/Image'
import Utility from '../utilities/Utility'
import { useState, useEffect } from 'react'

const Earthquake = ({ earthquake }) => {
  return (
    <div className='earthquake'>
      <div className='container-fluid px-0'>
        <div className='row g-0'>
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
    <div className='card-information shadow-lg px-4 py-4' onClick={handleOnClick}>
      <div className='row g-0'>
        <div className='col-auto my-auto pe-2'>
          <p className='text-size-figure fw-bold mb-0' style={{ color: Utility.magnitude.getColor(magnitude) }}>{magnitude.toFixed(1)}</p>
        </div>
        <div className='col-auto my-auto pe-2'>
          {magnitude >= 6 && Image.Warning({ width: 30, height: 30 })}
        </div>
      </div>
      <div className='row g-0'>
        <div className='col-auto my-auto pe-2'>
          {Icon.Down({ display: 'block', width: 18, height: 18, color: '#fff' })}
        </div>
        <div className='col-auto my-auto pe-2'>
          <p className='text-size-lg fw-bold mb-0'>{`${depth} km`}</p>
        </div>
        <div className='col-auto my-auto pe-2'>
          <FetchIndicator />
        </div>
      </div>
      <div className='row g-0'>
        <div className='col my-auto'>
          <p className='text-size-lg fw-bold mb-0'>{location}</p>
        </div>
      </div>
      <div className='row g-0 mt-2'>
        <div className='col-auto my-auto'>
          <MagnitudeScale />
        </div>
        <div className='col-auto my-auto'>
          <LocationIndicator />
        </div>
      </div>
    </div>
  )
}

const FetchIndicator = () => {
  const [color, setColor] = useState('#2ecc71')

  useEffect(() => { Utility.display.setIndicatorColor = (color) => setColor(color) }, [])

  return (
    <div className='indicator-fetch' style={{ backgroundColor: color }} />
  )
}

const LocationIndicator = () => {
  return (
    <div className='indicator-location d-flex justify-content-center align-items-center'>
      <p className='text-size-xs fw-bold mb-0'>{Utility.configuration.getLocation().code}</p>
    </div>
  )
}

const MagnitudeScale = () => {
  return (
    <div className='row g-0'>
      <ScaleUnit value={3} color={Utility.magnitude.getColor(3)} text='3-' />
      <ScaleUnit value={4} color={Utility.magnitude.getColor(4)} text='4' />
      <ScaleUnit value={5} color={Utility.magnitude.getColor(5)} text='5' />
      <ScaleUnit value={6} color={Utility.magnitude.getColor(6)} text='6' />
      <ScaleUnit value={7} color={Utility.magnitude.getColor(7)} text='7' />
      <ScaleUnit value={8} color={Utility.magnitude.getColor(8)} text='8+' />
    </div>
  )
}

const ScaleUnit = ({ value, color, text }) => {
  const handleOnClick = () => {
    Utility.configuration.minMagnitude = value
    Utility.dataCycle.update()
  }

  return (
    <div className='col-auto pe-3 my-auto'>
      <div className='indicator-scale d-flex justify-content-center align-items-center' style={{ backgroundColor: color }} onClick={handleOnClick}>
        <p className='text-size-sm fw-bold mb-0'>{text}</p>
      </div>
    </div>
  )
}

export default Earthquake