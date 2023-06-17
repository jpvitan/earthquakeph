/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { BoardRegular } from '../components/Board'
import { Field } from '../components/Form'
import Data from '../utilities/Data'
import Icon from '../utilities/Icon'
import { useState } from 'react'

const Location = ({ configuration, engine, earthquake, onClose }) => {
  const [search, setSearch] = useState('')

  const update = (location) => {
    configuration.app.toggleLoading(true)

    if (location.code === 'UL') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const range = location.range

          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          location.coordinates = { latitude, longitude }
          location.area = [
            latitude - range,
            latitude + range,
            longitude - range,
            longitude + range
          ]

          configuration.engine.location = location
          engine.update({ forced: false, recycle: true })

          onClose()
        },
        (error) => {
          configuration.app.toggleLoading(false)

          configuration.app.toggleMessage({
            visible: true,
            title: 'Location Error',
            message: error.message,
            onClose: () => { configuration.app.toggleMessage({ visible: false }) }
          })
        }
      )
    } else {
      configuration.engine.location = location
      engine.update({ forced: false, recycle: true })

      onClose()
    }
  }

  return (
    <div className='location'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-4'>
            <Field
              label={Icon.Search({ width: 15, height: 15, color: '#999' })}
              placeholder='Search'
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
          </section>
          <section className='mt-4'>
            {
              Data.Location
                .filter((location) => location.name.toLowerCase().includes(search.toLowerCase()))
                .map((location) => <Unit key={location.code} location={location} onClick={() => { update(location) }} />)
            }
          </section>
        </div>
      </div>
    </div>
  )
}

const Unit = ({ location, onClick }) => {
  const { name, code } = location

  return (
    <div className='unit row mb-4'>
      <div className='col'>
        <BoardRegular onClick={onClick}>
          <div className='row g-0'>
            <div className='col-auto my-auto pe-1'>
              <p className='text-size-lg text-color-green fw-bold mb-0'>{code}</p>
            </div>
            <div className='col-auto my-auto pe-1'>
              {Icon.Down({ transform: 'rotate(270deg)', display: 'block', width: 10, height: 10, color: '#fff' })}
            </div>
          </div>
          <div className='row g-0'>
            <div className='col-auto my-auto pe-1'>
              <p className='text-size-sm fw-bold mb-0'>{name}</p>
            </div>
          </div>
        </BoardRegular>
      </div>
    </div>
  )
}

export default Location
