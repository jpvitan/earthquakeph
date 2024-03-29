/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { BoardStack } from '../components/Board'
import { Field, Value } from '../components/Form'
import { TextBN } from '../components/Text'
import Data from '../utilities/Data'
import Icon from '../utilities/Icon'
import { useState } from 'react'

const Location = ({ configuration, engine, earthquake, onClose }) => {
  const [location, setLocation] = useState(configuration.engine.location)
  const [search, setSearch] = useState('')

  const callback = (earthquake) => {
    if (earthquake.list.length === 0) {
      configuration.app.toggleMessage({
        icon: 'location',
        title: 'No Results Found',
        message: 'There are no available results for your selected location. Please choose another location and try again.',
        onClose: () => { configuration.app.toggleMessage(null) }
      })
      configuration.engine.location = location
    } else {
      configuration.app.toggleMessage({
        icon: 'success',
        title: 'Location Updated',
        message: 'Your location has been successfully updated.',
        onClose: () => { configuration.app.toggleMessage(null) }
      })
      setLocation(configuration.engine.location)
    }
  }

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
          engine.update({
            recycle: true,
            callback
          })
        },
        (error) => {
          configuration.app.toggleLoading(false)

          configuration.app.toggleMessage({
            icon: 'error',
            title: 'Location Error',
            message: error.message,
            onClose: () => { configuration.app.toggleMessage(null) }
          })
        }
      )
    } else {
      configuration.engine.location = location
      engine.update({
        recycle: true,
        callback
      })
    }
  }

  return (
    <div className='location'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-5'>
            <BoardStack>
              <Value
                label='Location'
                value={`${configuration.engine.location.name} (${configuration.engine.location.code})`}
              />
              <TextBN>You might see some results from adjacent or neighboring countries due to overlapping bounding boxes. This behavior is normal and expected.</TextBN>
              {
                location.code === 'UL' &&
                  <>
                    <hr />
                    <Value
                      label='Latitude'
                      value={`${configuration.engine.location.coordinates.latitude}° N`}
                    />
                    <hr />
                    <Value
                      label='Longitude'
                      value={`${configuration.engine.location.coordinates.longitude}° E`}
                    />
                    <hr />
                    <Value
                      label='Range'
                      value={configuration.engine.location.range}
                    />
                  </>
              }
            </BoardStack>
          </section>
          <section className='mt-5'>
            <Field
              label={Icon.Search({ width: 15, height: 15, color: '#999' })}
              placeholder='Search'
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
          </section>
          <section className='mt-5'>
            <BoardStack>
              {
                Data.Location
                  .filter((location) =>
                    location.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((location, index, array) =>
                    <div key={location.code}>
                      <Unit location={location} onClick={() => { update(location) }} />
                      {index !== array.length - 1 && <hr />}
                    </div>
                  )
              }
            </BoardStack>
          </section>
        </div>
      </div>
    </div>
  )
}

const Unit = ({ location, onClick }) => {
  const { name, code } = location

  return (
    <div className='unit row' onClick={onClick}>
      <div className='col my-auto'>
        <p className='text-size-sm text-color-gray mb-0'>{`${name} (${code})`}</p>
      </div>
      <div className='col-auto my-auto'>
        {Icon.Down({ transform: 'rotate(270deg)', display: 'block', width: 10, height: 10, color: '#bdc3c7' })}
      </div>
    </div>
  )
}

export default Location
