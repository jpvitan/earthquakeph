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
import { TextSM, TextLG } from '../components/Text'
import Icon from '../utilities/Icon'
import Image from '../utilities/Image'
import { useState } from 'react'

const History = ({ configuration, engine, earthquake, onClose }) => {
  const [search, setSearch] = useState('')

  const focus = (earthquake) => {
    configuration.app.map.flyTo({ center: [earthquake.longitude, earthquake.latitude], zoom: 12 })
    configuration.app.togglePanel(earthquake)
    onClose()
  }

  return (
    <div className='history'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-5'>
            <Field
              label={Icon.Search({ width: 15, height: 15, color: '#999' })}
              placeholder='Search'
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
          </section>
          <section className='mt-4'>
            {
              earthquake.list
                .filter((earthquake) => earthquake.location.toLowerCase().includes(search.toLowerCase()))
                .map((earthquake) => <Unit key={earthquake.id} earthquake={earthquake} onClick={() => { focus(earthquake) }} />)
            }
          </section>
        </div>
      </div>
    </div>
  )
}

const Unit = ({ earthquake, onClick }) => {
  const {
    location,
    depth,
    time,
    magnitude,
    color
  } = earthquake

  return (
    <div className='unit row mb-4'>
      <div className='col'>
        <BoardRegular onClick={onClick}>
          <div className='row g-0'>
            <div className='col-auto my-auto pe-1'>
              <TextLG style={{ color }}>{magnitude.toFixed(1)}</TextLG>
            </div>
            <div className='col-auto my-auto pe-1'>
              {magnitude >= 6 && Image.Warning({ display: 'block', width: 18, height: 18 })}
            </div>
          </div>
          <div className='row g-0'>
            <div className='col-auto my-auto pe-1'>
              {Icon.Down({ display: 'block', width: 10, height: 10, color: '#fff' })}
            </div>
            <div className='col-auto my-auto pe-1'>
              <TextSM>{`${depth} km`}</TextSM>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col my-auto'>
              <TextSM>{`${time.toDateString()} ${time.toLocaleTimeString('en-US', { hour12: false })}`}</TextSM>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col my-auto'>
              <TextSM>{location}</TextSM>
            </div>
          </div>
        </BoardRegular>
      </div>
    </div>
  )
}

export default History
