/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Icon from '../../utility/Icon'
import Utility from '../../utility/Utility'
import History from '../../pages/History/History'
import Settings from '../../pages/Settings/Settings'
import About from '../../pages/About/About'
import { useEffect, useState } from 'react'
import './Panel.scss'

const page = [
  { name: 'History', Page: History },
  { name: 'Settings', Page: Settings },
  { name: 'About', Page: About }
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
    <div className='left-panel'>
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
    <div className='right-panel'>
      <div className='container-fluid px-0'>
        <Button icon={Icon.Globe()} onClick={() => { }} />
        <Button icon={Icon.Palette()} onClick={() => { }} />
      </div>
    </div>
  )
}

const Button = ({ icon, onClick }) => {
  return (
    <div className='row'>
      <div className='col-auto mx-2 my-2'>
        <div className='button' onClick={onClick}>
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
    <div className='content'>
      <div className='container-fluid px-4'>
        <div className='row py-4'>
          <div className='col my-auto'>
            <div className='heading'>{name}</div>
          </div>
          <div className='col-auto my-auto'>
            <div className='close-icon-container shadow-lg' onClick={onClose}>
              {Icon.Close({ display: 'block', position: 'relative', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '40', height: '40' })}
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
