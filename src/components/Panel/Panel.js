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
import { useState } from 'react'
import './Panel.scss'

const Panel = ({ earthquake }) => {
  const iconStyle = { display: 'block', position: 'relative', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px' }

  return (
    <div className='panel'>
      <div className='left-panel'>
        <div className='container-fluid px-0'>
          <PageButton earthquake={earthquake} name='History' content={History} icon={Icon.History(iconStyle)} />
          <PageButton earthquake={earthquake} name='Settings' content={Settings} icon={Icon.Settings(iconStyle)} />
          <PageButton earthquake={earthquake} name='About' content={About} icon={Icon.About(iconStyle)} />
        </div>
      </div>
      <div className='right-panel'>
        <div className='container-fluid px-0'>
          <Button
            icon={Icon.Globe(iconStyle)} onClick={() => {
              Utility.configuration.squareAreaValue = 1
              Utility.dataCycle.update()
            }}
          />
          <Button
            icon={Icon.Palette(iconStyle)} onClick={() => {

            }}
          />
        </div>
      </div>
    </div>
  )
}

const Button = (properties) => {
  const { icon, onClick } = properties

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

const PageButton = (properties) => {
  const [visible, setVisible] = useState(false)

  const { style, icon } = properties

  return (
    <div className='row'>
      <div className='col-auto mx-2 my-2'>
        <div className='button' style={style} onClick={() => { setVisible(true) }}>
          {icon}
        </div>
        {visible && <PageContent {...properties} onClose={() => setVisible(false)} />}
      </div>
    </div>
  )
}

const PageContent = ({ name, onClose, content, earthquake }) => {
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
            {content(onClose, earthquake)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
