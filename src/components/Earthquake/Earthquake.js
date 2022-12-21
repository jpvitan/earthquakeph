/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

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
  const handleOnClick = () => Utility.map.setCoordinates(longitude, latitude, 7)

  return (
    <div className='information-card shadow-lg text-light' onClick={handleOnClick}>
      <div className='container-fluid px-4 py-4'>
        <div className='row mb-2'>
          <div className='col-auto'>
            <h1 className='my-0' style={{ fontWeight: 'bold', color: Utility.getMagnitudeColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
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
        <div className='row mt-2'>
          <div className='col'>
            <MagnitudeScale />
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
          <ScaleUnit value={3} color={Utility.getMagnitudeColor(3)} text='3-' />
          <ScaleUnit value={4} color={Utility.getMagnitudeColor(4)} text='4' />
          <ScaleUnit value={5} color={Utility.getMagnitudeColor(5)} text='5' />
          <ScaleUnit value={6} color={Utility.getMagnitudeColor(6)} text='6' />
          <ScaleUnit value={7} color={Utility.getMagnitudeColor(7)} text='7' />
          <ScaleUnit value={8} color={Utility.getMagnitudeColor(8)} text='8+' />
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
    <div className='col-auto pe-1'>
      <div className='scale-unit' style={{ backgroundColor: color }} onClick={handleOnClick}>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Earthquake
