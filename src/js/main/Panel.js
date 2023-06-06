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
  const [data, setData] = useState(earthquake)

  const { location, latitude, longitude, depth, time, magnitude, color } = data

  const onClickLocation = () => {
    configuration.app.map.flyTo({ center: [longitude, latitude], zoom: 12 })
  }

  useEffect(() => {
    configuration.app.togglePanel = (data) => {
      setData(data)
    }
  }, [configuration])

  return (
    <div className='panel shadow-lg px-4 py-4'>
      <div className='container-fluid px-0'>
        <div className='row g-0'>
          <div className='col-auto my-auto pe-2'>
            <p className='text-size-xxl fw-bold mb-0' style={{ color }}>{magnitude.toFixed(1)}</p>
          </div>
          <div className='col-auto my-auto pe-2'>
            <IndicatorWarning magnitude={magnitude} />
          </div>
          <div className='col my-auto pe-2' />
          <div className='col-auto my-auto pe-2'>
            <ButtonControl onClick={onClickLocation} icon={Icon.Location()} />
          </div>
          <div className='col-auto my-auto'>
            <ButtonControl onClick={onClickLocation} icon={Icon.Intersection()} />
          </div>
        </div>
        <div className='row g-0'>
          <div className='col-auto my-auto pe-2'>
            {Icon.Down({ display: 'block', width: 12, height: 12, color: '#fff' })}
          </div>
          <div className='col-auto my-auto pe-2'>
            <p className='text-size-md fw-bold mb-0'>{`${depth} km`}</p>
          </div>
          <div className='col-auto my-auto pe-2'>
            <IndicatorStatus engine={engine} />
          </div>
        </div>
        <div className='row g-0'>
          <div className='col my-auto'>
            <p className='text-size-md fw-bold mb-0'>{`${time.toDateString()} ${time.toLocaleTimeString('en-US', { hour12: false })}`}</p>
          </div>
        </div>
        <div className='row g-0'>
          <div className='col my-auto'>
            <p className='text-size-md fw-bold mb-0'>{location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const IndicatorWarning = ({ magnitude }) => {
  if (magnitude < 6) return null
  return Image.Warning({ width: 24, height: 24 })
}

const IndicatorStatus = ({ engine }) => {
  const [color, setColor] = useState(Color.Status('success'))
  const style = { backgroundColor: color }

  useEffect(() => { engine.setOnStatusChange((status) => { setColor(Color.Status(status)) }) }, [engine])

  return (<div className='indicator-status' style={style} />)
}

const ButtonControl = ({ onClick, icon }) => {
  return (
    <div className='button-control d-flex justify-content-center align-items-center' onClick={onClick}>
      {icon}
    </div>
  )
}

export default Panel
