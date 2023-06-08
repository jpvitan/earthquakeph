/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { ScreenContent } from '../components/Screen'
import History from '../pages/History'
import Location from '../pages/Location'
import Settings from '../pages/Settings'
import Icon from '../utilities/Icon'
import { useState } from 'react'

const directory = [
  { name: 'Previous Earthquakes', Page: History },
  { name: 'Location and Range', Page: Location },
  { name: 'Settings and Privacy', Page: Settings }
]

const Control = ({ configuration, engine, earthquake }) => {
  const [page, setPage] = useState(null)
  const togglePage = (page) => { setPage(page) }

  return (
    <div className='control'>
      <LeftControl
        togglePage={togglePage}
      />
      <Content
        configuration={configuration}
        engine={engine}
        earthquake={earthquake}
        page={page}
        togglePage={togglePage}
      />
    </div>
  )
}

const LeftControl = ({ togglePage }) => {
  return (
    <div className='left-control shadow-lg'>
      <div className='container-fluid px-0'>
        <ButtonControl icon={Icon.Time()} onClick={() => { togglePage(0) }} />
        <ButtonControl icon={Icon.Globe()} onClick={() => { togglePage(1) }} />
        <ButtonControl icon={Icon.Settings()} onClick={() => { togglePage(2) }} />
      </div>
    </div>
  )
}

const ButtonControl = ({ icon, onClick }) => {
  return (
    <div className='row g-0'>
      <div className='col-auto mx-2 my-2'>
        <div className='button-control d-flex justify-content-center align-items-center' onClick={onClick}>{icon}</div>
      </div>
    </div>
  )
}

const Content = ({ configuration, engine, earthquake, page, togglePage }) => {
  if (page === null) return null

  const { name, Page } = directory[page]
  const onClose = () => { togglePage(null) }

  return (
    <ScreenContent name={name} onClose={onClose}>
      <Page configuration={configuration} engine={engine} earthquake={earthquake} onClose={onClose} />
    </ScreenContent>
  )
}

export default Control
