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

const Control = ({ earthquake }) => {
  const [pageIndex, setPageIndex] = useState(null)
  const togglePageIndex = (pageIndex) => setPageIndex(pageIndex)

  return (
    <div className='control'>
      <LeftControl togglePageIndex={togglePageIndex} />
      {pageIndex !== null && <Content pageIndex={pageIndex} togglePageIndex={togglePageIndex} earthquake={earthquake} />}
    </div>
  )
}

const LeftControl = ({ togglePageIndex }) => {
  return (
    <div className='left-control shadow-lg'>
      <div className='container-fluid px-0'>
        <ButtonControl icon={Icon.Time()} onClick={() => { togglePageIndex(0) }} />
        <ButtonControl icon={Icon.Globe()} onClick={() => { togglePageIndex(1) }} />
        <ButtonControl icon={Icon.Settings()} onClick={() => { togglePageIndex(2) }} />
      </div>
    </div>
  )
}

const ButtonControl = ({ icon, onClick }) => {
  return (
    <div className='row g-0'>
      <div className='col-auto mx-2 my-2'>
        <div className='button-control d-flex justify-content-center align-items-center' onClick={onClick}>
          {icon}
        </div>
      </div>
    </div>
  )
}

const Content = ({ pageIndex, togglePageIndex, earthquake }) => {
  const { Page } = Data.Page[pageIndex]
  const onClose = () => togglePageIndex(null)

  return (
    <div className='screen'>
      <div className='container-fluid px-4'>
        <div className='row py-4'>
          <div className='col my-auto' />
          <div className='col-auto my-auto'>
            <div className='button-icon d-flex justify-content-center align-items-center' onClick={onClose}>
              {Icon.Close()}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Page onClose={onClose} earthquake={earthquake} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Control