/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Data from '../utilities/Data'
import Icon from '../utilities/Icon'
import { useState } from 'react'

const Panel = ({ earthquake }) => {
  const [pageIndex, setPageIndex] = useState(null)
  const togglePageIndex = (pageIndex) => setPageIndex(pageIndex)

  return (
    <div className='panel'>
      <LeftPanel togglePageIndex={togglePageIndex} />
      {pageIndex !== null && <Content pageIndex={pageIndex} togglePageIndex={togglePageIndex} earthquake={earthquake} />}
    </div>
  )
}

const LeftPanel = ({ togglePageIndex }) => {
  return (
    <div className='left-panel shadow-lg'>
      <div className='container-fluid px-0'>
        <Button icon={Icon.Time()} onClick={() => { togglePageIndex(0) }} />
        <Button icon={Icon.Globe()} onClick={() => { togglePageIndex(1) }} />
        <Button icon={Icon.Settings()} onClick={() => { togglePageIndex(2) }} />
      </div>
    </div>
  )
}

const Button = ({ icon, onClick }) => {
  return (
    <div className='row g-0'>
      <div className='col-auto mx-2 my-2'>
        <div className='button-panel d-flex justify-content-center align-items-center' onClick={onClick}>
          {icon}
        </div>
      </div>
    </div>
  )
}

const Content = ({ pageIndex, togglePageIndex, earthquake }) => {
  const { Page } = Data.Page()[pageIndex]
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

export default Panel
