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
import { Value } from '../components/Form'

const Information = ({ earthquake }) => {
  const {
    magnitude,
    magnitudeType,
    tsunami,
    time,
    location,
    latitude,
    longitude,
    depth,
    id,
    status
  } = earthquake

  return (
    <div className='information'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Magnitude and Tsunami</p>
            <BoardStack>
              <Value label='Magnitude' value={magnitude} />
              <hr />
              <Value label='Type' value={magnitudeType} />
              <hr />
              <Value label='Tsunami' value={(tsunami === 1) ? 'Possible' : 'No'} />
            </BoardStack>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Date and Location</p>
            <BoardStack>
              <Value label='Date' value={`${time.toDateString()}`} />
              <hr />
              <Value label='Time' value={`${time.toLocaleTimeString('en-US', { hour12: false })}`} />
              <hr />
              <Value label='Place' value={location} />
              <hr />
              <Value label='Latitude' value={`${latitude}° N`} />
              <hr />
              <Value label='Longitude' value={`${longitude}° E`} />
              <hr />
              <Value label='Depth' value={`${depth} km`} />
            </BoardStack>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Data</p>
            <BoardStack>
              <Value label='ID' value={id} />
              <hr />
              <Value label='Status' value={status} />
            </BoardStack>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Information
