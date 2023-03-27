/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Color from '../utilities/Color'
import Icon from '../utilities/Icon'
import Image from '../utilities/Image'
import { useEffect, useState } from 'react'

const Panel = ({ configuration, engine, earthquake }) => {
  const { code } = configuration.getLocation()
  const { latitude, longitude, location, depth, magnitude, color } = earthquake

  const onClick = () => { if (configuration.map) configuration.map.flyTo({ center: [longitude, latitude], zoom: 12 }) }

  return (
    <div className='panel shadow-lg px-4 py-4' onClick={onClick}>
      <div className='container-fluid px-0'>
        <div className='row g-0'>
          <div className='col-auto my-auto pe-2'>
            <p className='text-size-figure fw-bold mb-0' style={{ color }}>{`${magnitude.toFixed(1)}`}</p>
          </div>
          <div className='col-auto my-auto pe-2'>
            <IndicatorWarning magnitude={magnitude} />
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
            <IndicatorStatus engine={engine} />
          </div>
        </div>
        <div className='row g-0'>
          <div className='col my-auto'>
            <p className='text-size-lg fw-bold mb-0'>{location}</p>
          </div>
        </div>
        <div className='row g-0 mt-2'>
          <div className='col-auto my-auto'>
            <ScaleMagnitude configuration={configuration} engine={engine} />
          </div>
          <div className='col-auto my-auto'>
            <IndicatorLocation location={code} />
          </div>
        </div>
      </div>
    </div>
  )
}

const IndicatorWarning = ({ magnitude }) => {
  if (magnitude < 6) return null
  return Image.Warning({ width: 30, height: 30 })
}

const IndicatorStatus = ({ engine }) => {
  const [color, setColor] = useState(Color.Status('success'))
  const style = { backgroundColor: color }

  useEffect(() => { engine.setOnStatusChange((status) => { setColor(Color.Status(status)) }) }, [engine])

  return (<div className='indicator-status' style={style} />)
}

const IndicatorLocation = ({ location }) => {
  return (
    <div className='indicator-location d-flex justify-content-center align-items-center'>
      <p className='text-size-xs fw-bold mb-0'>{location}</p>
    </div>
  )
}

const ScaleMagnitude = ({ configuration, engine }) => {
  const options = [
    { value: 3, text: '3-' },
    { value: 4, text: '4' },
    { value: 5, text: '5' },
    { value: 6, text: '6' },
    { value: 7, text: '7' },
    { value: 8, text: '8+' }
  ]

  const update = (value) => {
    configuration.minMagnitude = value
    engine.update()
  }

  return (
    <div className='row g-0'>
      {
        options.map((magnitude) => <ButtonMagnitude key={magnitude.value} value={magnitude.value} text={magnitude.text} onClick={() => { update(magnitude.value) }} />)
      }
    </div>
  )
}

const ButtonMagnitude = ({ value, text, onClick }) => {
  const style = { backgroundColor: Color.Magnitude(value) }

  return (
    <div className='col-auto pe-3 my-auto'>
      <div className='button-magnitude d-flex justify-content-center align-items-center' style={style} onClick={onClick}>
        <p className='text-size-sm fw-bold mb-0'>{text}</p>
      </div>
    </div>
  )
}

export default Panel
