/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Icon from '../../utility/Icon'
import Utility from '../../utility/Utility'
import About from '../../pages/About'
import History from '../../pages/History'
import Location from '../../pages/Location'
import Settings from '../../pages/Settings'
import { useState } from 'react'

const page = [
  { name: 'History', Page: History },
  { name: 'Settings', Page: Settings },
  { name: 'About', Page: About },
  { name: 'Location', Page: Location }
]

const Panel = ({ earthquake }) => {
  const [pageIndex, setPageIndex] = useState(null)

  const togglePageIndex = (pageIndex) => {
    setPageIndex(pageIndex)
  }

  return (
    <div className='panel'>
      <LeftPanel togglePageIndex={togglePageIndex} />
      <RightPanel togglePageIndex={togglePageIndex} />
      {pageIndex !== null && <Content pageIndex={pageIndex} togglePageIndex={togglePageIndex} earthquake={earthquake} />}
    </div>
  )
}

const LeftPanel = ({ togglePageIndex }) => {
  return (
    <div className='left-panel shadow-lg'>
      <div className='container-fluid px-0'>
        <Button icon={Icon.History()} onClick={() => { togglePageIndex(0) }} />
        <Button icon={Icon.Settings()} onClick={() => { togglePageIndex(1) }} />
        <Button icon={Icon.About()} onClick={() => { togglePageIndex(2) }} />
      </div>
    </div>
  )
}

const RightPanel = ({ togglePageIndex }) => {
  return (
    <div className='right-panel shadow-lg'>
      <div className='container-fluid px-0'>
        <Button
          icon={Icon.Globe()} onClick={() => {
            togglePageIndex(3)
          }}
        />
        <Button
          icon={Icon.Map()} onClick={() => {
            Utility.configuration.setNextMapTheme()
            Utility.dataCycle.update(true)
          }}
        />
        <Button
          icon={Icon.Palette()} onClick={() => {
            Utility.configuration.setNextAppTheme()
          }}
        />
      </div>
    </div>
  )
}

const Button = ({ icon, onClick }) => {
  return (
    <div className='row'>
      <div className='col-auto mx-2 my-2'>
        <div className='button-icon d-flex justify-content-center align-items-center' onClick={onClick}>
          {icon}
        </div>
      </div>
    </div>
  )
}

const Content = ({ pageIndex, togglePageIndex, earthquake }) => {
  const { name, Page } = page[pageIndex]

  const onClose = () => {
    togglePageIndex(null)
  }

  return (
    <div className='content shadow-lg'>
      <div className='container-fluid px-4'>
        <div className='row py-4'>
          <div className='col my-auto'>
          </div>
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
