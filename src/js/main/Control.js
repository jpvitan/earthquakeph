/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Data from '../utilities/Data'
import Icon from '../utilities/Icon'
import { useState } from 'react'

const Control = ({ configuration, engine, earthquake }) => {
  const [page, setPage] = useState(null)
  const togglePage = (page) => { setPage(page) }

  return (
    <div className='control'>
      <LeftControl togglePage={togglePage} />
      <Content configuration={configuration} engine={engine} earthquake={earthquake} page={page} togglePage={togglePage} />
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

  const { name, Page } = Data.Page[page]
  const onClose = () => { togglePage(null) }

  return (
    <div className='screen'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='content-sm col px-4 py-4'>
            <div className='row'>
              <div className='col my-auto'>
                <p className='text-size-xl fw-bold mb-0'>{name}</p>
              </div>
              <div className='col-auto my-auto'>
                <div className='button-control d-flex justify-content-center align-items-center' onClick={onClose}>{Icon.Close()}</div>
              </div>
            </div>
            <Page configuration={configuration} engine={engine} earthquake={earthquake} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Control
