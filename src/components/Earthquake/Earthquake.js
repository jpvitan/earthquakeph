/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Icon from '../../utility/Icon'
import Utility from '../../utility/Utility'
import './Earthquake.css'
import warningSign from '../../assets/img/warning.png'
import tsunamiSign from '../../assets/img/tsunami.png'

const Earthquake = (globalProperties) => {
  return (
    <>
      <InformationCard {...globalProperties} />
      <TsunamiSign {...globalProperties} />
      <MagnitudeScale {...globalProperties} />
    </>
  )
}

const InformationCard = ({ earthquake, map }) => {
  const { longitude, latitude, location, depth, magnitude } = earthquake

  const handleOnClick = () => map.setCoordinates(longitude, latitude, 7)

  return (
    <div className='earthquake-card shadow-lg text-light px-4 py-4' onClick={handleOnClick}>
      <div className='row mb-2'>
        <div className='col-auto'>
          <h1 className='my-0' style={{ fontWeight: 'bold', color: Utility.getMagnitudeColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
        </div>
        <div className='col-auto my-auto px-0'>
          {magnitude >= 6 && <img id='warning-sign' src={warningSign} alt='Warning Sign' width={35} height={35} />}
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
          <div id='fetch-indicator' className='shadow-lg' style={{ backgroundColor: '#95a5a6' }} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-0'>{location}</p>
        </div>
      </div>
    </div>
  )
}

const TsunamiSign = ({ earthquake }) => {
  const { tsunami } = earthquake

  return (
    <>{tsunami === 1 && <img id='tsunami-sign' src={tsunamiSign} alt='Tsunami Sign' width={24} height={21} />}</>
  )
}

const MagnitudeScale = () => {
  return (
    <div className='magnitude-scale'>
      <div style={{ bottom: '18rem', backgroundColor: Utility.getMagnitudeColor(3) }}><p>3-</p></div>
      <div style={{ bottom: '16rem', backgroundColor: Utility.getMagnitudeColor(4) }}><p>4</p></div>
      <div style={{ bottom: '14rem', backgroundColor: Utility.getMagnitudeColor(5) }}><p>5</p></div>
      <div style={{ bottom: '12rem', backgroundColor: Utility.getMagnitudeColor(6) }}><p>6</p></div>
      <div style={{ bottom: '10rem', backgroundColor: Utility.getMagnitudeColor(7) }}><p>7</p></div>
      <div style={{ bottom: '8rem', backgroundColor: Utility.getMagnitudeColor(8) }}><p>8+</p></div>
    </div>
  )
}

export default Earthquake
