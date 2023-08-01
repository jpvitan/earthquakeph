/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { ButtonIcon } from '../components/Button'
import { TextMD, TextXXL } from '../components/Text'
import Color from '../utilities/Color'
import Icon from '../utilities/Icon'
import Image from '../utilities/Image'
import { useState, useEffect } from 'react'

const Panel = ({ configuration, engine, earthquake }) => {
  const [data, setData] = useState(earthquake)

  useEffect(() => {
    configuration.app.togglePanel = (data) => {
      setData(data)
    }
  }, [configuration])

  const {
    location,
    latitude,
    longitude,
    depth,
    time,
    magnitude,
    color
  } = data

  const onClickLocation = () => {
    configuration.app.map.flyTo({
      center: [longitude, latitude],
      zoom: 12
    })
  }
  const onClickInformation = () => {
    configuration.page.togglePage({
      name: 'information',
      props: { earthquake: data }
    })
  }

  return (
    <div className='panel shadow-lg px-4 py-4'>
      <div className='container-fluid px-0'>
        <div className='row g-0'>
          <div className='col-auto my-auto pe-2'>
            <TextXXL style={{ color }}>{magnitude.toFixed(1)}</TextXXL>
          </div>
          <div className='col-auto my-auto pe-2'>
            {magnitude >= 6 && Image.Warning({ width: 24, height: 24 })}
          </div>
          <div className='col my-auto pe-2' />
          <div className='col-auto my-auto pe-2'>
            <ButtonIcon onClick={onClickLocation}>{Icon.Location()}</ButtonIcon>
          </div>
          <div className='col-auto my-auto'>
            <ButtonIcon onClick={onClickInformation}>{Icon.Intersection()}</ButtonIcon>
          </div>
        </div>
        <div className='row g-0'>
          <div className='col-auto my-auto pe-2'>
            {Icon.Down({ display: 'block', width: 12, height: 12, color: '#fff' })}
          </div>
          <div className='col-auto my-auto pe-2'>
            <TextMD>{`${depth} km`}</TextMD>
          </div>
          <div className='col-auto my-auto pe-2'>
            <IndicatorStatus engine={engine} />
          </div>
        </div>
        <div className='row g-0'>
          <div className='col my-auto'>
            <TextMD>{`${time.toDateString()} ${time.toLocaleTimeString('en-US', { hour12: false })}`}</TextMD>
          </div>
        </div>
        <div className='row g-0'>
          <div className='col my-auto'>
            <TextMD>{location}</TextMD>
          </div>
        </div>
      </div>
    </div>
  )
}

const IndicatorStatus = ({ engine }) => {
  const [color, setColor] = useState(Color.Status('success'))

  useEffect(() => {
    const id = engine.setOnStatusChange((status) => { setColor(Color.Status(status)) })
    return () => { engine.unsubscribeOnStatusChange(id) }
  }, [engine])

  return (<div className='indicator-status' style={{ backgroundColor: color }} />)
}

export default Panel
