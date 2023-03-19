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
  const { longitude, latitude, location, depth, magnitude } = earthquake

  return (
    <div className='panel shadow-lg px-4 py-4'>
      <div className='container-fluid px-0'>
        <div className='row g-0'>
          <div className='col-auto my-auto pe-2'>
            <p className='text-size-figure fw-bold mb-0' style={{ color: Color.Magnitude(magnitude) }}>{magnitude.toFixed(1)}</p>
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
            <IndicatorFetch engine={engine} />
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
            <IndicatorLocation location={configuration.getLocation().code} />
          </div>
        </div>
      </div>
    </div>
  )
}

const IndicatorFetch = ({ engine }) => {
  const [color, setColor] = useState('#2ecc71')

  useEffect(() => { engine.setOnStatusChange((status) => { setColor(Color.Status(status)) }) }, [engine])

  return (
    <div className='indicator-fetch' style={{ backgroundColor: color }} />
  )
}

const IndicatorLocation = ({ location }) => {
  return (
    <div className='indicator-location d-flex justify-content-center align-items-center'>
      <p className='text-size-xs fw-bold mb-0'>{location}</p>
    </div>
  )
}

const ScaleMagnitude = ({ configuration, engine }) => {
  return (
    <div className='row g-0'>
      <ButtonMagnitude configuration={configuration} engine={engine} value={3} color={Color.Magnitude(3)} text='3-' />
      <ButtonMagnitude configuration={configuration} engine={engine} value={4} color={Color.Magnitude(4)} text='4' />
      <ButtonMagnitude configuration={configuration} engine={engine} value={5} color={Color.Magnitude(5)} text='5' />
      <ButtonMagnitude configuration={configuration} engine={engine} value={6} color={Color.Magnitude(6)} text='6' />
      <ButtonMagnitude configuration={configuration} engine={engine} value={7} color={Color.Magnitude(7)} text='7' />
      <ButtonMagnitude configuration={configuration} engine={engine} value={8} color={Color.Magnitude(8)} text='8+' />
    </div>
  )
}

const ButtonMagnitude = ({ configuration, engine, value, color, text }) => {
  const onClick = () => {
    configuration.minMagnitude = value
    engine.update()
  }

  return (
    <div className='col-auto pe-3 my-auto'>
      <div className='button-magnitude d-flex justify-content-center align-items-center' style={{ backgroundColor: color }} onClick={onClick}>
        <p className='text-size-sm fw-bold mb-0'>{text}</p>
      </div>
    </div>
  )
}

export default Panel
